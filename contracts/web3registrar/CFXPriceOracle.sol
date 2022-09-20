// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.4;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract CFXPriceOracle is Ownable {
    int256 value;

    constructor(int256 _value) {
        set(_value);
    }

    function set(int256 _value) public onlyOwner {
        value = _value;
    }

    function latestAnswer() public view returns (int256) {
        return value;
    }
}
