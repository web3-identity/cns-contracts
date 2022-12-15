// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import '@ensdomains/ens-contracts/contracts/resolvers/PublicResolver.sol';

contract CNSPublicResolver is PublicResolver {
    uint256 private constant COIN_TYPE_CFX = 503;

    constructor(
        ENS _ens,
        INameWrapper wrapperAddress,
        address _trustedETHController,
        address _trustedReverseRegistrar
    ) PublicResolver(_ens, wrapperAddress, _trustedETHController, _trustedReverseRegistrar) {}

    /**
     * Sets the address associated with an ENS node.
     * May only be called by the owner of that node in the ENS registry.
     * @param node The node to update.
     * @param a The address to set.
     */
    function setAddr(bytes32 node, address a)
        external
        virtual
        override
        authorised(node)
    {
        setAddr(node, COIN_TYPE_CFX, addressToBytes(a));
    }

    /**
     * Returns the address associated with an ENS node.
     * @param node The ENS node to query.
     * @return The associated address.
     */
    function addr(bytes32 node)
        public
        view
        virtual
        override
        returns (address payable)
    {
        bytes memory a = addr(node, COIN_TYPE_CFX);
        if (a.length == 0) {
            return payable(0);
        }
        return bytesToAddress(a);
    }
}