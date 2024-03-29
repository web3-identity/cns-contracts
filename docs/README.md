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

### Conflux Core Mainnet

```shell
ENS_REGISTRY=cfx:acemru7fu1u8brtyn3hrtae17kbcd4pd9uwbspvnnm
REVERSE_REGISTRAR=cfx:acfarpzehntpre0thg8x7dp0ajw4ms328ps634v1zk
BASE_REGISTRAR=cfx:acg08bujp0kmsup1zk11c9mad7zd6648eybmv2kbha
NAME_WRAPPER=cfx:acdpx5pyc9xkry6x84bdstvt52grxpj69uadprjs7p
WEB3_CONTROLLER=cfx:ace0bgf408jt5kmw34k3mxx03tpsfpt8by010ma8ww
PUBLIC_RESOLVER=cfx:acasaruvgf44ss67pxzfs1exvj7k2vyt863f72n6up
FIFS_REGISTRAR=cfx:achbbpdja6c3f4s6efuh7ckr85p5pf8xheet9nucz0
REVERSE_RECORDS=cfx:achsgpgs5dgpmgpj2zd87apj6js33c07pjth6k33mj
CNS_UTIL=cfx:ace8hzgt9rcwejnh7dw1861r881g9rcgyy04r298hn
```

### Conflux Core Testnet

Deployed at 2023.2.9
```shell
ENS_REGISTRY=cfxtest:acemru7fu1u8brtyn3hrtae17kbcd4pd9u2m761bta
REVERSE_REGISTRAR=cfxtest:acfarpzehntpre0thg8x7dp0ajw4ms328pe1mm17vd
BASE_REGISTRAR=cfxtest:acg08bujp0kmsup1zk11c9mad7zd6648eynbcjtndm
NAME_WRAPPER=cfxtest:acapc3y2j7atme3bawvaex18hs36tn40uu5h6j3mtu
WEB3_CONTROLLER=cfxtest:aca1858y5a9fnyx9rxd1c9knr517cd0e6afzzhgj01
PUBLIC_RESOLVER=cfxtest:acbfyf69zaxau5a23w10dgyrmb0hrz4p9pewn6sejp
FIFS_REGISTRAR=cfxtest:achbbpdja6c3f4s6efuh7ckr85p5pf8xhesep50jv6
REVERSE_RECORDS=cfxtest:acgddsj3kah2f4f4c6959bvc4732f4juyj90h0zmg2
CNS_UTIL=cfxtest:aca4w63ypgup8tryphprzfcrh5kh0hpbgasb2z3s0j
```

## FAQs

### How to query domain expire time?

Use `BaseRegistrar`'s `nameExpires` method to query domain expire time.