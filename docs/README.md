# CNS contracts

CNS contracts is developed based on ENS contracts, a lot concepts are same as ENS.

CNS [Contracts API](./index.md)

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

## Deployment

### Conflux Core Testnet

```shell
ENS_REGISTRY=cfxtest:achg113s8916v2u756tvf6hdvmbsb73b16ykt1pvwm
REVERSE_REGISTRAR=cfxtest:ach1p03gkptxz07p4ecn66gjpd0xrnkkbj1n6p96d5
BASE_REGISTRAR=cfxtest:acc1ttg7287cybsdy6bn0002nzepypn29yavjbj36g
STATIC_METADATA_SERVICE=cfxtest:acf1bttd0gs15m1b64ucfp9b5aap0z3bzjb9ganvjj
NAME_WRAPPER=cfxtest:acdc4xzy0pg1dzrbajgmv8nw3cjyj6ezn2dzncc4w5 
CFX_PRICE_ORACLE=cfxtest:acbu9ysrdzbsk3hkxwerk1ehg9a5ac3fneg3ezzda8
STABLE_ORACLE=cfxtest:acd51b7m6gufh1przxthzakrnm9w3g544ykhbt3pv5
WEB3_CONTROLLER=cfxtest:acbrnwph2609zbf21np0501d87xb9dnvuakpv911xk 
PUBLIC_RESOLVER=cfxtest:acecxexm0pg268m44jncw5bmagwwmun53jj9msmadj
NAME_WHITELIST=cfxtest:acb7w3sxhtt9rxj8c8y426scdc54266fwu1f05x2rm
```

## FAQs

### How to query domain expire time?

Use `BaseRegistrar`'s `nameExpires` method to query domain expire time.