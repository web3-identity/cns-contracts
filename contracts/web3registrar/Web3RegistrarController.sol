//SPDX-License-Identifier: MIT
pragma solidity ~0.8.17;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {Initializable} from "@openzeppelin/contracts/proxy/utils/Initializable.sol";

import {BaseRegistrarImplementation} from "@ensdomains/ens-contracts/contracts/ethregistrar/BaseRegistrarImplementation.sol";
import {StringUtils} from "@ensdomains/ens-contracts/contracts/ethregistrar/StringUtils.sol";
import {Resolver} from "@ensdomains/ens-contracts/contracts/resolvers/Resolver.sol";
import {ReverseRegistrar} from "@ensdomains/ens-contracts/contracts/registry/ReverseRegistrar.sol";
import {IETHRegistrarController} from "@ensdomains/ens-contracts/contracts/ethregistrar/IETHRegistrarController.sol";
import {ERC20Recoverable} from "@ensdomains/ens-contracts/contracts/utils/ERC20Recoverable.sol";

import {INameWhitelist} from "./INameWhitelist.sol";
import {IFiatPriceOracle} from "./IFiatPriceOracle.sol";
import {ICNameWrapper} from '../wrapper/ICNameWrapper.sol';

error CommitmentTooNew(bytes32 commitment);
error CommitmentTooOld(bytes32 commitment);
error NameNotAvailable(string name);
error NameLocked(string name);
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
contract Web3RegistrarController is
    AccessControl,
    IETHRegistrarController,
    ERC20Recoverable,
    Initializable
{
    using StringUtils for *;
    using Address for address;

    enum LabelStatus {
        Valid,
        TooShort,
        Reserved,
        IllegalChar,
        Locked,
        Registered,
        SoldOut
    }

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE"); // CNS UPDATE
    uint256 public constant MIN_REGISTRATION_DURATION = 28 days;
    bytes32 private constant ETH_NODE =
        0x587d09fe5fa45354680537d38145a28b772971e0f293af3ee0c536fc919710fb;  // CNS UPDATE: eth -> web3
    uint64 private constant MAX_EXPIRY = type(uint64).max;
    BaseRegistrarImplementation base;
    IFiatPriceOracle public prices;
    uint256 public minCommitmentAge;
    uint256 public maxCommitmentAge;
    ReverseRegistrar public reverseRegistrar;
    ICNameWrapper public nameWrapper;
    INameWhitelist public nameWhitelist; // CNS UPDATE

    mapping(bytes32 => uint256) public commitments;
    uint256 private validLen = 4; // CNS UPDATE
    uint256 private label45Quota = 50000; // CNS UPDATE

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
        IFiatPriceOracle _prices,
        uint256 _minCommitmentAge,
        uint256 _maxCommitmentAge,
        ReverseRegistrar _reverseRegistrar,
        ICNameWrapper _nameWrapper
    ) {
        _setupRole(ADMIN_ROLE, msg.sender);
        _init(_base, _prices, _minCommitmentAge, _maxCommitmentAge, _reverseRegistrar, _nameWrapper);
    }

    function initialize(
        BaseRegistrarImplementation _base,
        IFiatPriceOracle _prices,
        uint256 _minCommitmentAge,
        uint256 _maxCommitmentAge,
        ReverseRegistrar _reverseRegistrar,
        ICNameWrapper _nameWrapper,
        address _admin
    ) public initializer {
        _setupRole(ADMIN_ROLE, _admin);
        _init(_base, _prices, _minCommitmentAge, _maxCommitmentAge, _reverseRegistrar, _nameWrapper);
    }

    function _init(
        BaseRegistrarImplementation _base,
        IFiatPriceOracle _prices,
        uint256 _minCommitmentAge,
        uint256 _maxCommitmentAge,
        ReverseRegistrar _reverseRegistrar,
        ICNameWrapper _nameWrapper
    ) internal {
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
        validLen = 4;
        label45Quota = 50000;
    }

    function rentPrice(string memory name, uint256 duration)
        public
        view
        override
        returns (IFiatPriceOracle.Price memory price)
    {
        bytes32 label = keccak256(bytes(name));
        price = prices.price(name, base.nameExpires(uint256(label)), duration);
    }

    function valid(string memory name) public view returns (bool) {
        return name.strlen() >= validLen;
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
            // revert ResolverRequiredWhenDataSupplied();
            require(false, "ResolverRequiredWhenDataSupplied");
        }
        if (duration < MIN_REGISTRATION_DURATION) {
            // revert DurationTooShort(duration);
            require(false, "DurationTooShort");
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
            // revert UnexpiredCommitmentExists(commitment);
            require(false, "UnexpiredCommitmentExists");
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
        IFiatPriceOracle.Price memory price = rentPrice(name, duration);
        if (msg.value < price.base + price.premium) {
            // revert InsufficientValue();
            require(false, "InsufficientValue");
        }

        _register(name, owner, duration, secret, resolver, data, reverseRecord, fuses, wrapperExpiry);

        if (msg.value > (price.base + price.premium)) {
            payable(msg.sender).transfer(
                msg.value - (price.base + price.premium)
            );
        }
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
        require(labelStatus(name) == LabelStatus.Valid, "Label is not valid to register");

        IFiatPriceOracle.Price memory price = rentPrice(name, duration);

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
        uint256 tokenId = uint256(labelhash);
        IFiatPriceOracle.Price memory price = rentPrice(name, duration);
        if (msg.value < price.base) {
            // revert InsufficientValue();
            require(false, "InsufficientValue");
        }
        uint256 expires;
        expires = nameWrapper.renew(tokenId, duration, fuses, wrapperExpiry);

        if (msg.value > price.base) {
            payable(msg.sender).transfer(msg.value - price.base);
        }

        emit NameRenewed(name, labelhash, msg.value, expires);
    }

    function withdraw() public {
        payable(owner()).transfer(address(this).balance);
    }

    function supportsInterface(bytes4 interfaceID)
        public
        pure
        override(AccessControl)
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
            // revert CommitmentTooNew(commitment);
            require(false, "CommitmentTooNew");
        }

        // If the commitment is too old, or the name is registered, stop
        if (commitments[commitment] + maxCommitmentAge <= block.timestamp) {
            // revert CommitmentTooOld(commitment);
            require(false, "CommitmentTooOld");
        }
        if (!available(name)) {
            // revert NameNotAvailable(name);
            require(false, "NameNotAvailable");
        }

        delete (commitments[commitment]);

        if (duration < MIN_REGISTRATION_DURATION) {
            // revert DurationTooShort(duration);
            require(false, "DurationTooShort");
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

    /* Admin functions */

    // CNS UPDATE
    function rentPriceInFiat(string memory name, uint256 duration)
        public
        view
        returns (IFiatPriceOracle.Price memory price)
    {
        bytes32 label = keccak256(bytes(name));
        price = prices.priceInFiat(name, base.nameExpires(uint256(label)), duration);
    }

    // CNS UPDATE
    function labelStatus(string memory _label) public view returns (LabelStatus) {
        // too short
        if (!valid(_label)) {
            return LabelStatus.TooShort;
        }
        // check char
        if (!nameWhitelist.isLabelValid(_label)) {
            return LabelStatus.IllegalChar;
        }
        if (nameWhitelist.isReserved(_label)) {
            return LabelStatus.Reserved;
        }
        // registered
        if (!available(_label)) {
            return LabelStatus.Registered;
        }
        if ((_label.strlen() == 4 || _label.strlen() == 5) && nameWrapper.label45Count() >= label45Quota) {
            return LabelStatus.SoldOut;
        }
        return LabelStatus.Valid;
    }

    // CNS UPDATE
    function renewWithFiat(string calldata name, uint256 duration, uint32 fuses, uint64 wrapperExpiry) public onlyRole(ADMIN_ROLE)
    {
        bytes32 labelhash = keccak256(bytes(name));
        uint256 tokenId = uint256(labelhash);
        uint256 expires;
        
        expires = nameWrapper.renew(
            tokenId,
            duration,
            fuses,
            wrapperExpiry
        );

        emit NameRenewed(name, labelhash, 0, expires);
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
    ) public onlyRole(ADMIN_ROLE) {
        _register(name, owner, duration, secret, resolver, data, reverseRecord, fuses, wrapperExpiry);
    }

    // CNS UPDATE
    function setCommitmentAge(uint256 _minCommitmentAge, uint256 _maxCommitmentAge) public onlyRole(ADMIN_ROLE) {
        if (_maxCommitmentAge <= _minCommitmentAge) {
            revert MaxCommitmentAgeTooLow();
        }
        if (_maxCommitmentAge > block.timestamp) {
            revert MaxCommitmentAgeTooHigh();
        }
        minCommitmentAge = _minCommitmentAge;
        maxCommitmentAge = _maxCommitmentAge;
    }

    // CNS UPDATE
    function setNameWhitelist(INameWhitelist _nameWhitelist) public onlyRole(ADMIN_ROLE) {
        nameWhitelist = _nameWhitelist;
    }

    // CNS UPDATE
    function setPriceOracle(IFiatPriceOracle _prices) public onlyRole(ADMIN_ROLE) {
        prices = _prices;
    }

    // CNS UPDATE
    function setValidLen(uint256 _len) public onlyRole(ADMIN_ROLE) {
        require(_len > 1, "minimal len is 2");
        validLen = _len;
    }

    // CNS UPDATE
    function setLabel45Quota(uint256 _quota) public onlyRole(ADMIN_ROLE) {
        require(_quota > label45Quota, "invalid quota");
        label45Quota = _quota;
    }
}
