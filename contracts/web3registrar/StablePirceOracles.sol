//SPDX-License-Identifier: MIT
pragma solidity ~0.8.17;

// import "@ensdomains/ens-contracts/contracts/ethregistrar/ExponentialPremiumPriceOracle.sol";

import "@ensdomains/ens-contracts/contracts/ethregistrar/IPriceOracle.sol";
import "@ensdomains/ens-contracts/contracts/ethregistrar/SafeMath.sol";
import "@ensdomains/ens-contracts/contracts/ethregistrar/StringUtils.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";

interface AggregatorInterface {
    function latestAnswer() external view returns (int256);
}

// StablePriceOracle sets a price in USD, based on an oracle.
contract StablePriceOracle is IPriceOracle, Ownable {
    using SafeMath for *;
    using StringUtils for *;

    // Rent in base price units by length
    uint256 public price1Letter;
    uint256 public price2Letter;
    uint256 public price3Letter;
    uint256 public price4Letter;
    uint256 public price5Letter;

    // Rent in fiat base price units by length
    uint256 public fiatPrice1Letter;
    uint256 public fiatPrice2Letter;
    uint256 public fiatPrice3Letter;
    uint256 public fiatPrice4Letter;
    uint256 public fiatPrice5Letter;

    // Oracle address
    AggregatorInterface public usdOracle;

    event RentPriceChanged(uint256[] prices, uint8 priceType);

    constructor(AggregatorInterface _usdOracle, uint256[] memory _rentPrices) {
        usdOracle = _usdOracle;
        price1Letter = _rentPrices[0];
        price2Letter = _rentPrices[1];
        price3Letter = _rentPrices[2];
        price4Letter = _rentPrices[3];
        price5Letter = _rentPrices[4];
    }

    function price(
        string calldata name,
        uint256 expires,
        uint256 duration
    ) external view override returns (IPriceOracle.Price memory) {
        uint256 len = name.strlen();
        uint256 basePrice;

        if (len >= 5) {
            basePrice = price5Letter * duration;
        } else if (len == 4) {
            basePrice = price4Letter * duration;
        } else if (len == 3) {
            basePrice = price3Letter * duration;
        } else if (len == 2) {
            basePrice = price2Letter * duration;
        } else {
            basePrice = price1Letter * duration;
        }

        return
            IPriceOracle.Price({
                base: attoUSDToWei(basePrice),
                premium: attoUSDToWei(_premium(name, expires, duration))
            });
    }

    // TODO: special names solo price
    function priceInFiat(
        string calldata name,
        uint256 expires,
        uint256 duration
    ) external view returns (IPriceOracle.Price memory) {
        uint256 len = name.strlen();
        uint256 basePrice;

        if (len >= 5) {
            basePrice = fiatPrice5Letter * duration;
        } else if (len == 4) {
            basePrice = fiatPrice4Letter * duration;
        } else if (len == 3) {
            basePrice = fiatPrice3Letter * duration;
        } else if (len == 2) {
            basePrice = fiatPrice2Letter * duration;
        } else {
            basePrice = fiatPrice1Letter * duration;
        }

        return
            IPriceOracle.Price({
                base: basePrice,
                premium: 0
            });
    }

    /**
     * @dev Returns the pricing premium in wei.
     */
    function premium(
        string calldata name,
        uint256 expires,
        uint256 duration
    ) external view returns (uint256) {
        return attoUSDToWei(_premium(name, expires, duration));
    }

    /**
     * @dev Returns the pricing premium in internal base units.
     */
    function _premium(
        string memory name,
        uint256 expires,
        uint256 duration
    ) internal view virtual returns (uint256) {
        return 0;
    }

    function attoUSDToWei(uint256 amount) internal view returns (uint256) {
        uint256 ethPrice = uint256(usdOracle.latestAnswer());
        return (amount * 1e8) / ethPrice;
    }

    function weiToAttoUSD(uint256 amount) internal view returns (uint256) {
        uint256 ethPrice = uint256(usdOracle.latestAnswer());
        return (amount * ethPrice) / 1e8;
    }

    function supportsInterface(bytes4 interfaceID)
        public
        view
        virtual
        returns (bool)
    {
        return
            interfaceID == type(IERC165).interfaceId ||
            interfaceID == type(IPriceOracle).interfaceId;
    }

    function setRentPrice(uint256[] memory _rentPrices) public onlyOwner {
        price1Letter = _rentPrices[0];
        price2Letter = _rentPrices[1];
        price3Letter = _rentPrices[2];
        price4Letter = _rentPrices[3];
        price5Letter = _rentPrices[4];
        emit RentPriceChanged(_rentPrices, 0);  // crypto
    }

    function setFiatRentPrice(uint256[] memory _rentPrices) public onlyOwner {
        fiatPrice1Letter = _rentPrices[0];
        fiatPrice1Letter = _rentPrices[1];
        fiatPrice1Letter = _rentPrices[2];
        fiatPrice1Letter = _rentPrices[3];
        fiatPrice1Letter = _rentPrices[4];
        emit RentPriceChanged(_rentPrices, 1);  // fiat
    }
}
