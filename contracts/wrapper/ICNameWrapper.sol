// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.4;

import {INameWrapper} from "@ensdomains/ens-contracts/contracts/wrapper/INameWrapper.sol";

interface ICNameWrapper is INameWrapper {
    function tokenCount() external view returns (uint256);
    function label45Count() external view returns (uint256);
}