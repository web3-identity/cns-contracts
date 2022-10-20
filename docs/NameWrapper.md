# NameWrapper

NameWrapper is ENS new imported contract. it can be used a wrap a domain name as 1155 NFT. When a domain is wrapped, domain owner need to invoke `NameWrapper`'s method to manage domain config for example `resolver`, `ttl`, `subRecord`.

For more info about `NameWrapper`, please refer to [NameWrapper](https://github.com/ensdomains/ens-contracts/tree/master/contracts/wrapper), and this [introduction - ENS Name Wrapper: Features, Benefits & Possibilities in Web3](https://web3domains.com/ens-name-wrapper-features-benefits-web3/)

NameWrapper is compatible with 1155 API, which means wrapped names are ERC1155 tokens. In addition to implementing ERC1155, wrapped names have an ERC721-compatible ownerOf function to return the owner of a wrapped name.

NOTE: A name's 1155 tokenId in NameWrapper is the the `namehash of the complete name`.

```js
const namehash = require('eth-ens-namehash');
const name = 'domain.web3';
const tokenId = namehash.hash(name);
```

[NameWrapper contract API](./index.md#namewrapper-1)

## wrap/unwrap

To wrap or unwrap a name, check this [introduction](https://github.com/ensdomains/ens-contracts/tree/master/contracts/wrapper#wrapping-a-name)

Related methods:

* wrapETH2LD
* unwrapETH2LD
* registerAndWrapETH2LD
* wrap
* unwrap

Currently if one buy a CNS name, it will automatically wrap the name.

## CNS Operations

### renew

```js
function renew(
        uint256 tokenId,
        uint256 duration,
        uint32 fuses,
        uint64 expiry
) external override onlyController returns (uint256 expires);
```

### setSubnodeOwner

```js
function setSubnodeOwner(
    bytes32 parentNode,
    string calldata label,
    address owner,
    uint32 fuses,
    uint64 expiry
)
```

### setSubnodeRecord

```js
function setSubnodeRecord(
    bytes32 parentNode,
    string memory label,
    address owner,
    address resolver,
    uint64 ttl,
    uint32 fuses,
    uint64 expiry
)
```

### setRecord

```js
function setRecord(
    bytes32 node,
    address owner,
    address resolver,
    uint64 ttl
)
```

### setResolver

```js
function setResolver(bytes32 node, address resolver)
```

### setTTL

```js
function setTTL(bytes32 node, uint64 ttl)
```

## userDomains

This method can return all domains owned by an address.

```js
function userDomains(address user) public view returns (string[] memory);
```

The returned domains is encoded as [DNS Name Notation and Message Compression Technique](http://www.tcpipguide.com/free/t_DNSNameNotationandMessageCompressionTechnique.htm#:~:text=Instead,%20DNS%20uses%20a%20special,are%20encoded,%20one%20per%20byte.)

## 1155 methods

* setApprovalForAll
* balanceOf
* safeTransferFrom
