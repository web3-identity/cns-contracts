// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "./utils/EnumerableStringSet.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;

    using EnumerableStringSet for EnumerableStringSet.StringSet;

    event Withdrawal(uint amount, uint when);

    event NewPriceOracle(address indexed oracle);

    EnumerableStringSet.StringSet private names;

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }

    function addName(string memory name) public {
        require(msg.sender == owner, "You aren't the owner");
        names.add(name);
    }

    function removeName(string memory name) public {
        require(msg.sender == owner, "You aren't the owner");
        names.remove(name);
    }

    function containsName(string memory name) public view returns (bool) {
        return names.contains(name);
    }

    function getNames() public view returns (string[] memory) {
        return names.values();
    }
}
