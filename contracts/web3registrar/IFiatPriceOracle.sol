// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.4;

import {IPriceOracle} from "@ensdomains/ens-contracts/contracts/ethregistrar/IETHRegistrarController.sol";

interface IFiatPriceOracle is IPriceOracle {
    function priceInFiat(
        string calldata name,
        uint256 expires,
        uint256 duration
    ) external view returns (IPriceOracle.Price memory);
}