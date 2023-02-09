//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@ensdomains/ens-contracts/contracts/registry/ENS.sol';
import '@ensdomains/ens-contracts/contracts/resolvers/Resolver.sol';
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IBaseRegistrar} from '@ensdomains/ens-contracts/contracts/ethregistrar/IBaseRegistrar.sol';

contract CNSUtil is Ownable  {
    ENS public ens;
    IBaseRegistrar public baseRegistrar;

    constructor(address _ens, address _base) {
        ens = ENS(_ens);
        baseRegistrar = IBaseRegistrar(_base);
    }

    function addr(bytes32 node) public view returns (address) {
        address resolver = ens.resolver(node);
        return Resolver(resolver).addr(node);
    }

    function addr(bytes32 node, uint256 coinType) public view returns (bytes memory) {
        address resolver = ens.resolver(node);
        return Resolver(resolver).addr(node, coinType);
    }

    function addrBatch(bytes32[] memory nodes) public view returns (address[] memory) {
        address[] memory addrs = new address[](nodes.length);
        for (uint256 i = 0; i < nodes.length; i++) {
            addrs[i] = addr(nodes[i]);
        }
        return addrs;
    }

    // if token not exist of expire return zero address rather than revert
    function ownerOf(uint256 tokenId) public view returns(address) {
        if (baseRegistrar.nameExpires(tokenId) <= block.timestamp) {
            return address(0);
        }
        return baseRegistrar.ownerOf(tokenId);
    }

    function setENS(address _ens) public onlyOwner {
        ens = ENS(_ens);
    } 

    function setBaseRegistrar(address _base) public onlyOwner {
        baseRegistrar = IBaseRegistrar(_base);
    }

}