// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "solidity-stringutils/src/strings.sol";
import "./INameWhitelist.sol";
// import "hardhat/console.sol";

// zero width space
// https://unicode-table.com/en/200B/
// https://www.fileformat.info/info/unicode/char/200b/index.htm

// flags
// https://apps.timwhitlock.info/emoji/tables/iso3166

// unicode-eth
// https://github.com/devstein/unicode-eth
// https://github.com/Arachnid/solidity-stringutils
// https://github.com/ethereum/solidity-examples/blob/master/src/strings/Strings.sol

contract NameWhitelist is Ownable, INameWhitelist {
    using strings for *;

    bytes constant ZERO_WIDTH_SPACE = hex"e2808b";

    string constant CHAR_WHITE_LIST = "abcdefghijklmnopqrstuvwxyz0123456789_"; // ABCDEFGHIJKLMNOPQRSTUVWXYZ

    string constant EMOJI_WHITE_LIST = unicode"✅";

    // string constant EMOJI_BLACK_LIST = unicode"​🇨🇳";

    mapping(string => bool) whiteList;
    // mapping(string => bool) blackList;
    mapping(bytes32 => bool) specialNames;  // Reserved names

    constructor() {
        strings.slice memory s1 = CHAR_WHITE_LIST.toSlice();
        uint s1Len = s1.len();
        for (uint256 i = 0; i < s1Len; i++) {
            whiteList[s1.nextRune().toString()] = true;
        }

        strings.slice memory s2 = EMOJI_WHITE_LIST.toSlice();
        uint s2Len = s2.len();
        for (uint256 i = 0; i < s2Len; i++) {
            whiteList[s2.nextRune().toString()] = true;
        }

        /* strings.slice memory s3 = EMOJI_BLACK_LIST.toSlice(); // NOTE: flag emojis is not supported by solidity-stringutils
        uint s3Len = s3.len();
        for (uint256 i = 0; i < s3Len; i++) {
            blackList[s3.nextRune().toString()] = true;
        } */
    }

    function checkIfZeroNotPresent(string memory _name) public pure returns (bool) {
        return !checkContainBytes(_name, ZERO_WIDTH_SPACE);
    }

    function checkContainBytes(string memory toCheck, bytes memory toFind) public pure returns (bool) {
        bytes memory nameInBytes = bytes(toCheck);
        if (nameInBytes.length < toFind.length) {
            return false;
        }
        for (uint256 i; i <= nameInBytes.length - toFind.length; i++) {
            bool found = true;
            for (uint256 j; j < toFind.length; j++) {
                found = found && (nameInBytes[i + j] == toFind[j]);
                if (!found) {
                    break;
                }
            }
            if (found) {
                return true;
            }
        }
        return false;
    }

    // NOTE: uppercase is not supported
    function isLabelValid(string memory _label) public view returns (bool) {
        /* if (specialNames[_label]) {
            return false;
        } */
        /* if (!checkIfZeroNotPresent(_label)) {
            return false;
        } */
        strings.slice memory s = _label.toSlice();
        uint256 sLen = s.len();
        for (uint256 i = 0; i < sLen; i++) {
            string memory rune = s.nextRune().toString();
            if (!whiteList[rune]) {
                return false;
            }
        }
        return true;
    }

    function isInWhiteList(string memory toCheck) public view returns (bool) {
        return whiteList[toCheck];
    }

    function isReserved(string memory label) public view returns (bool) {
        return specialNames[keccak(label)];
    }

    function setSpecialName(bytes32 name, bool isSpecial) public onlyOwner {
        specialNames[name] = isSpecial;
    }

    function setSpecialNameBatch(bytes32[] memory names, bool isSpecial) public onlyOwner {
        for(uint i = 0; i < names.length; i++) {
            specialNames[names[i]] = isSpecial;
        }
    }

    function setWhiteList(string memory char, bool isWhite) public onlyOwner {
        whiteList[char] = isWhite;
    }

    function setWhiteListBatch(string memory chars, bool isWhite) public onlyOwner {
        strings.slice memory s1 = chars.toSlice();
        uint s1Len = s1.len();
        for (uint256 i = 0; i < s1Len; i++) {
            whiteList[s1.nextRune().toString()] = isWhite;
        }
    }

    function keccak(string memory str) private pure returns (bytes32) {
        return keccak256(abi.encode(str));
    }
}
