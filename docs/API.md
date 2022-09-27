# CNS Contracts

The CNS Contracts has keep the most compatibility with ENS contracts. Which can enable project and users quick integrate and use CNS.

## Registry

This contract is the same as ENS Registry. Check [ENS Registry API doc](https://docs.ens.domains/contract-api-reference/ens) for details.

## ReverseRegistrar

This contract is the same as ENS ReverseRegistrar. Check [ENS ReverseRegistrar API doc](https://docs.ens.domains/contract-api-reference/reverseregistrar) for details.

## PublicResolver

This contract is the same as ENS PublicResolver. Check [ENS PublicResolver API doc](https://docs.ens.domains/contract-api-reference/publicresolver) for details.

## BaseRegistrar

This contract is the same as ENS BaseRegistrar. Check [ENS BaseRegistrar API doc](https://docs.ens.domains/contract-api-reference/.eth-permanent-registrar/registrar) for details.

## Controller

This contract is compatible ENS Controller. Check [ENS Controller API doc](https://docs.ens.domains/contract-api-reference/.eth-permanent-registrar/controller) for details.

The top domain managed by this controller is `web3`.

To purchase a submain of `web3`, user first need to call `makeCommitment` to build a commitment hash.

* `name` string - Second level domain name to register, eg `vilalik` for `vilalik.web3`
* `owner` address - Domain owner
* `duration` number - Domain duration in seconds
* `secret` bytes32 - Secret to protect the domain
* `resolver` address - Resolver address to set
* `calldata` bytes[] - Data to set to resolver
* `reverseRecord` bool - Whether to set reverse record
* `fuses` number - Wrapper fuses to set
* `wrapperExpiry` number - Wrapper expiry to set

```js
function makeCommitment(string memory name, address owner, uint256 duration, bytes32 secret, address resolver, bytes[] calldata data, bool reverseRecord, uint32 fuses, uint64 wrapperExpiry) public pure override returns (bytes32);
```

Then call `commit` method by send transaction to reserve the domain want to buy.

```js
function commit(bytes32 commitment) public override;
```

After two minutes, user can call `register` method with same parameters as `makeCommitment` to register the domain (need pay cfx).

CNS will support purchase domain with fiat, for this case, the CNS service will responsible for call `registerWithFiat` to register domain for user.

## NameWrapper


