# Web3Controller

This contract is compatible ENS Controller. Check [ENS Controller API doc](https://docs.ens.domains/contract-api-reference/.eth-permanent-registrar/controller) for details.

The top domain managed by this controller is `web3`.

## Purchase Steps

To purchase a submain of `web3` users need to the follow steps:

1. Call `makeCommitment` to calculate commitment hash.
2. Call `commit` to submit commitment by sending transaction.
3. Call `register` to register the name by sending transaction and value.

## APIs

### makeCommitment

Used to calculate commitment hash

#### Parameters

* `name` string - Second level domain name to register, eg `vilalik` for `vilalik.web3`
* `owner` address - Domain owner
* `duration` number - Domain duration in seconds
* `secret` bytes32 - Secret to protect the domain
* `resolver` address - Resolver address to set
* `calldata` bytes[] - Data to set to resolver
* `reverseRecord` bool - Whether to set reverse record
* `fuses` number - Wrapper fuses to set
* `wrapperExpiry` number - Wrapper expiry to set

#### Method Signature

```js
function makeCommitment(
    string memory name, 
    address owner, 
    uint256 duration, 
    bytes32 secret, 
    address resolver, 
    bytes[] calldata data, 
    bool reverseRecord, 
    uint32 fuses, 
    uint64 wrapperExpiry
) public pure override returns (bytes32);
```

### commit

Submit commitment

#### Parameters

* `commitment` bytes32 - commitment hash, calculated by makeCommitment method

#### Method Signature

```js
function commit(bytes32 commitment) public override;
```

### commitWithName

Submit commitment and also lock the name.

### Parameters

* `commitment` bytes32 - commitment hash, calculated by makeCommitment method
* `name` string - Second level domain name to register, eg `vilalik` for `vilalik.web3`

#### Method Signature

```js
function commitWithName(bytes32 commitment, string memory name) public override;
```

### register

After two minutes, user can call `register` method with same parameters as `makeCommitment` to register the domain (need pay cfx).

#### Parameters

Same as `makeCommitment`

#### Method Signature

```js
function register(
    string calldata name,
    address owner,
    uint256 duration,
    bytes32 secret,
    address resolver,
    bytes[] calldata data,
    bool reverseRecord,
    uint32 fuses,
    uint64 wrapperExpiry
) public payable override;
```

### registerWithFiat

CNS support purchase domain with fiat, for this case, the CNS service will responsible for call `registerWithFiat` to register domain for user.
Only contract admin can call this method, no need to pay cfx.

#### Parameters

Same as register