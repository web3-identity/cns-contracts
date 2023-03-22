# 合约介绍

## ENSRegistry

ENSRegistry 是 CNS 的底层合约合约，它维护了所有的域名及其信息(owner, resolver, ttl)的记录。核心数据结构为：

```js
struct Record {
    address owner;
    address resolver;
    uint64 ttl;
}

mapping(bytes32 => Record) records;
```

域名所有者，可对域名本身，及子域名进行设置。 

## ReverseRegistrar

该合约是域名反向解析域名的注册及设置合约。

通过如下方法可以 claim 地址的反向解析域名:

* claim
* claimForAddr
* claimWithResolver

通过如下方法可以设置地址的反向解析记录:

* setName
* setNameForAddr

## PublicResolver

该合约是默认的解析器实现，所有的域名解析设置及查询都在该合约实现。

正向解析：

* 设置：`function setAddr(bytes32 node, address a)`
* 查询：`function addr(bytes32 node) returns (address payable)`

反向解析：

* 设置：`function setName(bytes32 node, string calldata newName)`
* 查询：`function name(bytes32 node) returns (string memory)`