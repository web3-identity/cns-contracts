//SPDX-License-Identifier: MIT
pragma solidity ~0.8.17;

import {BaseRegistrarImplementation} from "@ensdomains/ens-contracts/contracts/ethregistrar/BaseRegistrarImplementation.sol";
import {StringUtils} from "@ensdomains/ens-contracts/contracts/ethregistrar/StringUtils.sol";
import {Resolver} from "@ensdomains/ens-contracts/contracts/resolvers/Resolver.sol";
import {ReverseRegistrar} from "@ensdomains/ens-contracts/contracts/registry/ReverseRegistrar.sol";
import {IETHRegistrarController, IPriceOracle} from "@ensdomains/ens-contracts/contracts/ethregistrar/IETHRegistrarController.sol";

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {INameWrapper} from "@ensdomains/ens-contracts/contracts/wrapper/INameWrapper.sol";
import {ERC20Recoverable} from "@ensdomains/ens-contracts/contracts/utils/ERC20Recoverable.sol";

error CommitmentTooNew(bytes32 commitment);
error CommitmentTooOld(bytes32 commitment);
error NameNotAvailable(string name);
error DurationTooShort(uint256 duration);
error ResolverRequiredWhenDataSupplied();
error UnexpiredCommitmentExists(bytes32 commitment);
error InsufficientValue();
error Unauthorised(bytes32 node);
error MaxCommitmentAgeTooLow();
error MaxCommitmentAgeTooHigh();

/**
 * @dev A registrar controller for registering and renewing names at fixed cost.
 */
contract ETHRegistrarController is
    Ownable,
    IETHRegistrarController,
    IERC165,
    ERC20Recoverable
{
    using StringUtils for *;
    using Address for address;

    uint256 public constant MIN_REGISTRATION_DURATION = 28 days;
    bytes32 private constant ETH_NODE =
        0x587d09fe5fa45354680537d38145a28b772971e0f293af3ee0c536fc919710fb;  // eth -> web3
    uint64 private constant MAX_EXPIRY = type(uint64).max;
    BaseRegistrarImplementation base;
    IPriceOracle public prices;
    uint256 public minCommitmentAge;
    uint256 public maxCommitmentAge;
    ReverseRegistrar public reverseRegistrar;
    INameWrapper public nameWrapper;

    mapping(bytes32 => uint256) public commitments;

    event NameRegistered(
        string name,
        bytes32 indexed label,
        address indexed owner,
        uint256 baseCost,
        uint256 premium,
        uint256 expires
    );
    event NameRenewed(
        string name,
        bytes32 indexed label,
        uint256 cost,
        uint256 expires
    );

    constructor(
        BaseRegistrarImplementation _base,
        IPriceOracle _prices,
        uint256 _minCommitmentAge,
        uint256 _maxCommitmentAge,
        ReverseRegistrar _reverseRegistrar,
        INameWrapper _nameWrapper
    ) {
        if (_maxCommitmentAge <= _minCommitmentAge) {
            revert MaxCommitmentAgeTooLow();
        }

        if (_maxCommitmentAge > block.timestamp) {
            revert MaxCommitmentAgeTooHigh();
        }

        base = _base;
        prices = _prices;
        minCommitmentAge = _minCommitmentAge;
        maxCommitmentAge = _maxCommitmentAge;
        reverseRegistrar = _reverseRegistrar;
        nameWrapper = _nameWrapper;
    }

    // CNS UPDATE
    function setCommitmentAge(uint256 _minCommitmentAge, uint256 _maxCommitmentAge) public onlyOwner {
        if (_maxCommitmentAge <= _minCommitmentAge) {
            revert MaxCommitmentAgeTooLow();
        }
        if (_maxCommitmentAge > block.timestamp) {
            revert MaxCommitmentAgeTooHigh();
        }
        minCommitmentAge = _minCommitmentAge;
        maxCommitmentAge = _maxCommitmentAge;
    }

    function rentPrice(string memory name, uint256 duration)
        public
        view
        override
        returns (IPriceOracle.Price memory price)
    {
        bytes32 label = keccak256(bytes(name));
        price = prices.price(name, base.nameExpires(uint256(label)), duration);
    }

    function valid(string memory name) public pure returns (bool) {
        return name.strlen() >= 3;
    }

    function available(string memory name) public view override returns (bool) {
        bytes32 label = keccak256(bytes(name));
        return valid(name) && base.available(uint256(label));
    }

    function makeCommitment(
        string memory name,
        address owner,
        uint256 duration,
        bytes32 secret,
        address resolver,
        bytes[] calldata data,
        bool reverseRecord,
        uint32 fuses,
        uint64 wrapperExpiry
    ) public pure override returns (bytes32) {
        bytes32 label = keccak256(bytes(name));
        if (data.length > 0 && resolver == address(0)) {
            revert ResolverRequiredWhenDataSupplied();
        }
        return
            keccak256(
                abi.encode(
                    label,
                    owner,
                    duration,
                    resolver,
                    data,
                    secret,
                    reverseRecord,
                    fuses,
                    wrapperExpiry
                )
            );
    }

    function commit(bytes32 commitment) public override {
        if (commitments[commitment] + maxCommitmentAge >= block.timestamp) {
            revert UnexpiredCommitmentExists(commitment);
        }
        commitments[commitment] = block.timestamp;
    }

    function register(
        string calldata name,
        address owner,
        uint256 duration,
        bytes32 secret,
        address resolver,
        bytes[] calldata data,
        bool reverseRecord,
        uint32 fuses,
        uint64 wrapperExpiry
    ) public payable override {
        IPriceOracle.Price memory price = rentPrice(name, duration);
        if (msg.value < price.base + price.premium) {
            revert InsufficientValue();
        }

        _register(name, owner, duration, secret, resolver, data, reverseRecord, fuses, wrapperExpiry);

        if (msg.value > (price.base + price.premium)) {
            payable(msg.sender).transfer(
                msg.value - (price.base + price.premium)
            );
        }
    }

    // CNS UPDATE
    function registerWithFiat(
        string calldata name,
        address owner,
        uint256 duration,
        bytes32 secret,
        address resolver,
        bytes[] calldata data,
        bool reverseRecord,
        uint32 fuses,
        uint64 wrapperExpiry
    ) public onlyOwner {
        _register(name, owner, duration, secret, resolver, data, reverseRecord, fuses, wrapperExpiry);
    }

    function _register(
        string memory name,
        address owner,
        uint256 duration,
        bytes32 secret,
        address resolver,
        bytes[] calldata data,
        bool reverseRecord,
        uint32 fuses,
        uint64 wrapperExpiry
    ) internal returns (uint256) {
        IPriceOracle.Price memory price = rentPrice(name, duration);

        _consumeCommitment(
            name,
            duration,
            makeCommitment(
                name,
                owner,
                duration,
                secret,
                resolver,
                data,
                reverseRecord,
                fuses,
                wrapperExpiry
            )
        );

        uint256 expires = nameWrapper.registerAndWrapETH2LD(
            name,
            owner,
            duration,
            resolver,
            fuses,
            wrapperExpiry
        );

        if (data.length > 0) {
            _setRecords(resolver, keccak256(bytes(name)), data);
        }

        if (reverseRecord) {
            _setReverseRecord(name, resolver, msg.sender);
        }

        emit NameRegistered(
            name,
            keccak256(bytes(name)),
            owner,
            price.base,
            price.premium,
            expires
        );

        return expires;
    }

    function renew(string calldata name, uint256 duration)
        external
        payable
        override
    {
        _renew(name, duration, 0, 0);
    }

    // CNS UPDATE
    function renewWithFiat(string calldata name, uint256 duration, uint32 fuses, uint64 wrapperExpiry) public onlyOwner
    {
        bytes32 labelhash = keccak256(bytes(name));
        bytes32 nodehash = keccak256(abi.encodePacked(ETH_NODE, labelhash));

        if (!nameWrapper.isTokenOwnerOrApproved(nodehash, msg.sender)) {
            revert Unauthorised(nodehash);
        }

        uint256 tokenId = uint256(labelhash);
        uint256 expires;
        
        if (nameWrapper.isWrapped(nodehash)) {
            expires = nameWrapper.renew(
                tokenId,
                duration,
                fuses,
                wrapperExpiry
            );
        } else {
            expires = base.renew(tokenId, duration);
        }

        emit NameRenewed(name, labelhash, 0, expires);
    }

    function renewWithFuses(
        string calldata name,
        uint256 duration,
        uint32 fuses,
        uint64 wrapperExpiry
    ) external payable {
        bytes32 labelhash = keccak256(bytes(name));
        bytes32 nodehash = keccak256(abi.encodePacked(ETH_NODE, labelhash));
        if (!nameWrapper.isTokenOwnerOrApproved(nodehash, msg.sender)) {
            revert Unauthorised(nodehash);
        }
        _renew(name, duration, fuses, wrapperExpiry);
    }

    function _renew(
        string calldata name,
        uint256 duration,
        uint32 fuses,
        uint64 wrapperExpiry
    ) internal {
        bytes32 labelhash = keccak256(bytes(name));
        bytes32 nodehash = keccak256(abi.encodePacked(ETH_NODE, labelhash));
        uint256 tokenId = uint256(labelhash);
        IPriceOracle.Price memory price = rentPrice(name, duration);
        if (msg.value < price.base) {
            revert InsufficientValue();
        }
        uint256 expires;
        if (nameWrapper.isWrapped(nodehash)) {
            expires = nameWrapper.renew(
                tokenId,
                duration,
                fuses,
                wrapperExpiry
            );
        } else {
            expires = base.renew(tokenId, duration);
        }

        if (msg.value > price.base) {
            payable(msg.sender).transfer(msg.value - price.base);
        }

        emit NameRenewed(name, labelhash, msg.value, expires);
    }

    function withdraw() public {
        payable(owner()).transfer(address(this).balance);
    }

    function supportsInterface(bytes4 interfaceID)
        external
        pure
        returns (bool)
    {
        return
            interfaceID == type(IERC165).interfaceId ||
            interfaceID == type(IETHRegistrarController).interfaceId;
    }

    /* Internal functions */

    function _consumeCommitment(
        string memory name,
        uint256 duration,
        bytes32 commitment
    ) internal {
        // Require an old enough commitment.
        if (commitments[commitment] + minCommitmentAge > block.timestamp) {
            revert CommitmentTooNew(commitment);
        }

        // If the commitment is too old, or the name is registered, stop
        if (commitments[commitment] + maxCommitmentAge <= block.timestamp) {
            revert CommitmentTooOld(commitment);
        }
        if (!available(name)) {
            revert NameNotAvailable(name);
        }

        delete (commitments[commitment]);

        if (duration < MIN_REGISTRATION_DURATION) {
            revert DurationTooShort(duration);
        }
    }

    function _setRecords(
        address resolverAddress,
        bytes32 label,
        bytes[] calldata data
    ) internal {
        bytes32 nodehash = keccak256(abi.encodePacked(ETH_NODE, label));
        Resolver resolver = Resolver(resolverAddress);
        resolver.multicallWithNodeCheck(nodehash, data);
    }

    function _setReverseRecord(
        string memory name,
        address resolver,
        address owner
    ) internal {
        reverseRegistrar.setNameForAddr(
            msg.sender,
            owner,
            resolver,
            string.concat(name, ".web3")  // eth -> web3
        );
    }
}
