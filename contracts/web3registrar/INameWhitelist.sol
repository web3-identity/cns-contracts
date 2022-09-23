// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface INameWhitelist {
  function isReserved(string memory label) external view returns (bool);

  function isLabelValid(string memory label) external view returns (bool);
}