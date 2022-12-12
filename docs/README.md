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
ENS_REGISTRY=cfxtest:acd3rm7y183trhpzvz8m3y72kx1abk4d0jh842585a
REVERSE_REGISTRAR=cfxtest:acfmezysbf86jy3jnw835bnamxp08dxzd61w5ur8hy
BASE_REGISTRAR=cfxtest:acbp262fvjzva1raef4n3e5yyszy9spsc20cmztnya
STATIC_METADATA_SERVICE=cfxtest:acf7j3kuvct7scnnv8a76eajpv6ptjefg65zhw8anx
NAME_WRAPPER=cfxtest:acbttry22rsx7k54ms6hbkc0c8tf680u5pc0r31ef5
CFX_PRICE_ORACLE=cfxtest:acc7e2b1420394bdfnsm9ja28kk8ypvk0umm5uejb9
STABLE_ORACLE=cfxtest:achyyf4jxuua822szywr58y680umumj4m2u2u9y5ux
WEB3_CONTROLLER=cfxtest:acde0h4f9nz70h146d4p0wbbx38zamwhue3uce1ndt
PUBLIC_RESOLVER=cfxtest:acfcb2fv6t8xrxyyx3x1atwmdrhh5xvfd21zsje216
NAME_WHITELIST=cfxtest:achkak1c8ddw1fsea8khe8sdmtrcagtpxu9fgh8e44
FIFS_REGISTRAR=cfxtest:accm9cj9afnb6ypt09g9whnret9mp5rneeh5hjfv6f
REVERSE_RECORDS=cfxtest:acccv089mvek41rsmjyf1yyg922phjd0ppt16hfuv1
```

## FAQs

### How to query domain expire time?

Use `BaseRegistrar`'s `nameExpires` method to query domain expire time.