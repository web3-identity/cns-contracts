# CNS contracts

CNS contracts is developed based on ENS contracts, a lot concepts are same as ENS.

CNS [Contract API](./index.md)

## Terminology

Check [ENS Terminology](https://docs.ens.domains/terminology) for details.

## Core Contracts

### Registry

The most important contract of CNS. This contract is the same as ENS Registry. Check [ENS Registry API doc](https://docs.ens.domains/contract-api-reference/ens) for details.

### PublicResolver

Used to set/get domain resolve data. This contract is the same as ENS PublicResolver. Check [ENS PublicResolver API doc](https://docs.ens.domains/contract-api-reference/publicresolver) for details.

### ReverseRegistrar

This contract is used to manage reverse record claim, and resolve record set/get. This contract is the same as ENS ReverseRegistrar. Check [ENS ReverseRegistrar API doc](https://docs.ens.domains/contract-api-reference/reverseregistrar) for details.

## BaseRegistrar

This contract is the same as ENS BaseRegistrar. Check [ENS BaseRegistrar API doc](https://docs.ens.domains/contract-api-reference/.eth-permanent-registrar/registrar) for details.

### Controller

Charge for `web3` subdomain registration, Check detail in [Controller](./Web3Controller.md).

### NameWrapper

This contract worked as a wrapper for domain, it can used to wrap a domain name as 1155 NFT. When a domain is wrapped, domain owner need to invoke `NameWrapper`'s method to manage domain config for example `resolver`, `ttl`, `subRecord`.

Check detail in [NameWrapper](./NameWrapper.md).