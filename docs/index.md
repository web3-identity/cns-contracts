# Solidity API

## Unauthorised

```solidity
error Unauthorised(bytes32 node, address addr)
```

## IncompatibleParent

```solidity
error IncompatibleParent()
```

## IncorrectTokenType

```solidity
error IncorrectTokenType()
```

## LabelMismatch

```solidity
error LabelMismatch(bytes32 labelHash, bytes32 expectedLabelhash)
```

## LabelTooShort

```solidity
error LabelTooShort()
```

## LabelTooLong

```solidity
error LabelTooLong(string label)
```

## IncorrectTargetOwner

```solidity
error IncorrectTargetOwner(address owner)
```

## CannotUpgrade

```solidity
error CannotUpgrade()
```

## OperationProhibited

```solidity
error OperationProhibited(bytes32 node)
```

## NameIsNotWrapped

```solidity
error NameIsNotWrapped()
```

## NameIsStillExpired

```solidity
error NameIsStillExpired()
```

## NameWrapper

### ens

```solidity
contract ENS ens
```

### registrar

```solidity
contract IBaseRegistrar registrar
```

### metadataService

```solidity
contract IMetadataService metadataService
```

### names

```solidity
mapping(bytes32 => bytes) names
```

### name

```solidity
string name
```

### GRACE_PERIOD

```solidity
uint64 GRACE_PERIOD
```

### ETH_NODE

```solidity
bytes32 ETH_NODE
```

### ETH_LABELHASH

```solidity
bytes32 ETH_LABELHASH
```

### ROOT_NODE

```solidity
bytes32 ROOT_NODE
```

### upgradeContract

```solidity
contract INameWrapperUpgrade upgradeContract
```

### MAX_EXPIRY

```solidity
uint64 MAX_EXPIRY
```

### _userNodes

```solidity
mapping(address => struct EnumerableSet.Bytes32Set) _userNodes
```

### constructor

```solidity
constructor(contract ENS _ens, contract IBaseRegistrar _registrar, contract IMetadataService _metadataService) public
```

### initialize

```solidity
function initialize(contract ENS _ens, contract IBaseRegistrar _registrar, contract IMetadataService _metadataService) public
```

### _init

```solidity
function _init(contract ENS _ens, contract IBaseRegistrar _registrar, contract IMetadataService _metadataService) internal
```

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view virtual returns (bool)
```

### ownerOf

```solidity
function ownerOf(uint256 id) public view returns (address owner)
```

Gets the owner of a name

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | uint256 | Label as a string of the .eth domain to wrap |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner | address | The owner of the name |

### getData

```solidity
function getData(uint256 id) public view returns (address owner, uint32 fuses, uint64 expiry)
```

Gets the data for a name

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | uint256 | Namehash of the name |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner | address | Owner of the name |
| fuses | uint32 | Fuses of the name |
| expiry | uint64 | Expiry of the name |

### setMetadataService

```solidity
function setMetadataService(contract IMetadataService _metadataService) public
```

Set the metadata service. Only the owner can do this

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _metadataService | contract IMetadataService | The new metadata service |

### uri

```solidity
function uri(uint256 tokenId) public view returns (string)
```

Get the metadata uri

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | The id of the token |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | string | string uri of the metadata service |

### setUpgradeContract

```solidity
function setUpgradeContract(contract INameWrapperUpgrade _upgradeAddress) public
```

Set the address of the upgradeContract of the contract. only admin can do this

_The default value of upgradeContract is the 0 address. Use the 0 address at any time
to make the contract not upgradable._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _upgradeAddress | contract INameWrapperUpgrade | address of an upgraded contract |

### onlyTokenOwner

```solidity
modifier onlyTokenOwner(bytes32 node)
```

Checks if msg.sender is the owner or approved by the owner of a name

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| node | bytes32 | namehash of the name to check |

### canModifyName

```solidity
function canModifyName(bytes32 node, address addr) public view returns (bool)
```

Checks if owner or approved by owner

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| node | bytes32 | namehash of the name to check |
| addr | address | which address to check permissions for |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | whether or not is owner or approved |

### wrapETH2LD

```solidity
function wrapETH2LD(string label, address wrappedOwner, uint16 ownerControlledFuses, address resolver) public
```

Wraps a .eth domain, creating a new token and sending the original ERC721 token to this contract

_Can be called by the owner of the name on the .eth registrar or an authorised caller on the registrar_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| label | string | Label as a string of the .eth domain to wrap |
| wrappedOwner | address | Owner of the name in this contract |
| ownerControlledFuses | uint16 | Initial owner-controlled fuses to set |
| resolver | address | Resolver contract address |

### registerAndWrapETH2LD

```solidity
function registerAndWrapETH2LD(string label, address wrappedOwner, uint256 duration, address resolver, uint16 ownerControlledFuses) external returns (uint256 registrarExpiry)
```

_Registers a new .eth second-level domain and wraps it.
     Only callable by authorised controllers._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| label | string | The label to register (Eg, 'foo' for 'foo.eth'). |
| wrappedOwner | address | The owner of the wrapped name. |
| duration | uint256 | The duration, in seconds, to register the name for. |
| resolver | address | The resolver address to set on the ENS registry (optional). |
| ownerControlledFuses | uint16 | Initial owner-controlled fuses to set |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| registrarExpiry | uint256 | The expiry date of the new name on the .eth registrar, in seconds since the Unix epoch. |

### renew

```solidity
function renew(uint256 tokenId, uint256 duration) external returns (uint256 expires)
```

Renews a .eth second-level domain.

_Only callable by authorised controllers._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | The hash of the label to register (eg, `keccak256('foo')`, for 'foo.eth'). |
| duration | uint256 | The number of seconds to renew the name for. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| expires | uint256 | The expiry date of the name on the .eth registrar, in seconds since the Unix epoch. |

### wrap

```solidity
function wrap(bytes name, address wrappedOwner, address resolver) public
```

Wraps a non .eth domain, of any kind. Could be a DNSSEC name vitalik.xyz or a subdomain

_Can be called by the owner in the registry or an authorised caller in the registry_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| name | bytes | The name to wrap, in DNS format |
| wrappedOwner | address | Owner of the name in this contract |
| resolver | address | Resolver contract |

### unwrapETH2LD

```solidity
function unwrapETH2LD(bytes32 labelhash, address registrant, address controller) public
```

Unwraps a .eth domain. e.g. vitalik.eth

_Can be called by the owner in the wrapper or an authorised caller in the wrapper_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| labelhash | bytes32 | Labelhash of the .eth domain |
| registrant | address | Sets the owner in the .eth registrar to this address |
| controller | address | Sets the owner in the registry to this address |

### unwrap

```solidity
function unwrap(bytes32 parentNode, bytes32 labelhash, address controller) public
```

Unwraps a non .eth domain, of any kind. Could be a DNSSEC name vitalik.xyz or a subdomain

_Can be called by the owner in the wrapper or an authorised caller in the wrapper_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| parentNode | bytes32 | Parent namehash of the name e.g. vitalik.xyz would be namehash('xyz') |
| labelhash | bytes32 | Labelhash of the name, e.g. vitalik.xyz would be keccak256('vitalik') |
| controller | address | Sets the owner in the registry to this address |

### setFuses

```solidity
function setFuses(bytes32 node, uint16 ownerControlledFuses) public returns (uint32)
```

Sets fuses of a name

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| node | bytes32 | Namehash of the name |
| ownerControlledFuses | uint16 | Owner-controlled fuses to burn |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint32 | Old fuses |

### extendExpiry

```solidity
function extendExpiry(bytes32 parentNode, bytes32 labelhash, uint64 expiry) public returns (uint64)
```

Extends expiry for a name

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| parentNode | bytes32 | Parent namehash of the name e.g. vitalik.xyz would be namehash('xyz') |
| labelhash | bytes32 | Labelhash of the name, e.g. vitalik.xyz would be keccak256('vitalik') |
| expiry | uint64 | When the name will expire in seconds since the Unix epoch |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint64 | New expiry |

### upgrade

```solidity
function upgrade(bytes name, bytes extraData) public
```

Upgrades a domain of any kind. Could be a .eth name vitalik.eth, a DNSSEC name vitalik.xyz, or a subdomain

_Can be called by the owner or an authorised caller_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| name | bytes | The name to upgrade, in DNS format |
| extraData | bytes | Extra data to pass to the upgrade contract |

### setChildFuses

```solidity
function setChildFuses(bytes32 parentNode, bytes32 labelhash, uint32 fuses, uint64 expiry) public
```

/* @notice Sets fuses of a name that you own the parent of. Can also be called by the owner of a .eth name

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| parentNode | bytes32 | Parent namehash of the name e.g. vitalik.xyz would be namehash('xyz') |
| labelhash | bytes32 | Labelhash of the name, e.g. vitalik.xyz would be keccak256('vitalik') |
| fuses | uint32 | Fuses to burn |
| expiry | uint64 | When the name will expire in seconds since the Unix epoch |

### setSubnodeOwner

```solidity
function setSubnodeOwner(bytes32 parentNode, string label, address owner, uint32 fuses, uint64 expiry) public returns (bytes32 node)
```

Sets the subdomain owner in the registry and then wraps the subdomain

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| parentNode | bytes32 | Parent namehash of the subdomain |
| label | string | Label of the subdomain as a string |
| owner | address | New owner in the wrapper |
| fuses | uint32 | Initial fuses for the wrapped subdomain |
| expiry | uint64 | When the name will expire in seconds since the Unix epoch |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| node | bytes32 | Namehash of the subdomain |

### setSubnodeRecord

```solidity
function setSubnodeRecord(bytes32 parentNode, string label, address owner, address resolver, uint64 ttl, uint32 fuses, uint64 expiry) public returns (bytes32 node)
```

Sets the subdomain owner in the registry with records and then wraps the subdomain

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| parentNode | bytes32 | parent namehash of the subdomain |
| label | string | label of the subdomain as a string |
| owner | address | new owner in the wrapper |
| resolver | address | resolver contract in the registry |
| ttl | uint64 | ttl in the registry |
| fuses | uint32 | initial fuses for the wrapped subdomain |
| expiry | uint64 | When the name will expire in seconds since the Unix epoch |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| node | bytes32 | Namehash of the subdomain |

### setRecord

```solidity
function setRecord(bytes32 node, address owner, address resolver, uint64 ttl) public
```

Sets records for the name in the ENS Registry

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| node | bytes32 | Namehash of the name to set a record for |
| owner | address | New owner in the registry |
| resolver | address | Resolver contract |
| ttl | uint64 | Time to live in the registry |

### setResolver

```solidity
function setResolver(bytes32 node, address resolver) public
```

Sets resolver contract in the registry

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| node | bytes32 | namehash of the name |
| resolver | address | the resolver contract |

### setTTL

```solidity
function setTTL(bytes32 node, uint64 ttl) public
```

Sets TTL in the registry

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| node | bytes32 | Namehash of the name |
| ttl | uint64 | TTL in the registry |

### operationAllowed

```solidity
modifier operationAllowed(bytes32 node, uint32 fuseMask)
```

_Allows an operation only if none of the specified fuses are burned._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| node | bytes32 | The namehash of the name to check fuses on. |
| fuseMask | uint32 | A bitmask of fuses that must not be burned. |

### _checkCanCallSetSubnodeOwner

```solidity
function _checkCanCallSetSubnodeOwner(bytes32 parentNode, bytes32 subnode) internal view
```

Check whether a name can call setSubnodeOwner/setSubnodeRecord

_Checks both CANNOT_CREATE_SUBDOMAIN and PARENT_CANNOT_CONTROL and whether not they have been burnt
     and checks whether the owner of the subdomain is 0x0 for creating or already exists for
     replacing a subdomain. If either conditions are true, then it is possible to call
     setSubnodeOwner_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| parentNode | bytes32 | Namehash of the parent name to check |
| subnode | bytes32 | Namehash of the subname to check |

### allFusesBurned

```solidity
function allFusesBurned(bytes32 node, uint32 fuseMask) public view returns (bool)
```

Checks all Fuses in the mask are burned for the node

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| node | bytes32 | Namehash of the name |
| fuseMask | uint32 | The fuses you want to check |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | Boolean of whether or not all the selected fuses are burned |

### isWrapped

```solidity
function isWrapped(bytes32 node) public view returns (bool)
```

Checks if a name is wrapped

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| node | bytes32 | Namehash of the name |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | Boolean of whether or not the name is wrapped |

### isWrapped

```solidity
function isWrapped(bytes32 parentNode, bytes32 labelhash) public view returns (bool)
```

Checks if a name is wrapped in a more gas efficient way

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| parentNode | bytes32 | Namehash of the name |
| labelhash | bytes32 | Namehash of the name |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | Boolean of whether or not the name is wrapped |

### onERC721Received

```solidity
function onERC721Received(address to, address, uint256 tokenId, bytes data) public returns (bytes4)
```

### _preTransferCheck

```solidity
function _preTransferCheck(uint256 id, uint32 fuses, uint64 expiry) internal view returns (bool)
```

### _clearOwnerAndFuses

```solidity
function _clearOwnerAndFuses(address owner, uint32 fuses, uint64 expiry) internal view returns (address, uint32)
```

### _makeNode

```solidity
function _makeNode(bytes32 node, bytes32 labelhash) private pure returns (bytes32)
```

### _addLabel

```solidity
function _addLabel(string label, bytes name) internal pure returns (bytes ret)
```

### _mint

```solidity
function _mint(bytes32 node, address owner, uint32 fuses, uint64 expiry) internal
```

### _wrap

```solidity
function _wrap(bytes32 node, bytes name, address wrappedOwner, uint32 fuses, uint64 expiry) internal
```

### _storeNameAndWrap

```solidity
function _storeNameAndWrap(bytes32 parentNode, bytes32 node, string label, address owner, uint32 fuses, uint64 expiry) internal
```

### _saveLabel

```solidity
function _saveLabel(bytes32 parentNode, bytes32 node, string label) internal returns (bytes)
```

### _updateName

```solidity
function _updateName(bytes32 parentNode, bytes32 node, string label, address owner, uint32 fuses, uint64 expiry) internal
```

### _checkParentFusesAndExpiry

```solidity
function _checkParentFusesAndExpiry(bytes32 parentNode, bytes32 node, uint32 fuses, uint64 expiry) internal view returns (uint64)
```

### _checkParentFuses

```solidity
function _checkParentFuses(bytes32 node, uint32 fuses, uint32 parentFuses) internal pure
```

### _normaliseExpiry

```solidity
function _normaliseExpiry(uint64 expiry, uint64 oldExpiry, uint64 maxExpiry) internal pure returns (uint64)
```

### _wrapETH2LD

```solidity
function _wrapETH2LD(string label, address wrappedOwner, uint32 fuses, uint64 expiry, address resolver) private
```

### _unwrap

```solidity
function _unwrap(bytes32 node, address owner) private
```

### _setFuses

```solidity
function _setFuses(bytes32 node, address owner, uint32 fuses, uint64 oldExpiry, uint64 expiry) internal
```

### _setData

```solidity
function _setData(bytes32 node, address owner, uint32 fuses, uint64 expiry) internal
```

### _canFusesBeBurned

```solidity
function _canFusesBeBurned(bytes32 node, uint32 fuses) internal pure
```

### _checkFusesAreSettable

```solidity
function _checkFusesAreSettable(bytes32 node, uint32 fuses) internal pure
```

### _isWrapped

```solidity
function _isWrapped(bytes32 node) internal view returns (bool)
```

### safeTransferFrom

```solidity
function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data) public virtual
```

### safeBatchTransferFrom

```solidity
function safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] amounts, bytes data) public virtual
```

### _updateNodeOwner

```solidity
function _updateNodeOwner(address from, address to, uint256 id) internal
```

### userNodeSet

```solidity
function userNodeSet(address user) public view returns (bytes32[])
```

### userDomains

```solidity
function userDomains(address user) public view returns (string[])
```

### _burn

```solidity
function _burn(uint256 tokenId) internal
```

## BulkRenewal

### ETH_NAMEHASH

```solidity
bytes32 ETH_NAMEHASH
```

### ens

```solidity
contract ENS ens
```

### constructor

```solidity
constructor(contract ENS _ens) public
```

### getController

```solidity
function getController() internal view returns (contract Web3RegistrarController)
```

### rentPrice

```solidity
function rentPrice(string[] names, uint256 duration) external view returns (uint256 total)
```

### renewAll

```solidity
function renewAll(string[] names, uint256 duration) external payable
```

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceID) external pure returns (bool)
```

## IFiatPriceOracle

### priceInFiat

```solidity
function priceInFiat(string name, uint256 expires, uint256 duration) external view returns (struct IPriceOracle.Price)
```

## INameWhitelist

### isReserved

```solidity
function isReserved(string label) external view returns (bool)
```

### isLabelValid

```solidity
function isLabelValid(string label) external view returns (bool)
```

## CommitmentTooNew

```solidity
error CommitmentTooNew(bytes32 commitment)
```

## CommitmentTooOld

```solidity
error CommitmentTooOld(bytes32 commitment)
```

## NameNotAvailable

```solidity
error NameNotAvailable(string name)
```

## DurationTooShort

```solidity
error DurationTooShort(uint256 duration)
```

## ResolverRequiredWhenDataSupplied

```solidity
error ResolverRequiredWhenDataSupplied()
```

## UnexpiredCommitmentExists

```solidity
error UnexpiredCommitmentExists(bytes32 commitment)
```

## InsufficientValue

```solidity
error InsufficientValue()
```

## Unauthorised

```solidity
error Unauthorised(bytes32 node)
```

## MaxCommitmentAgeTooLow

```solidity
error MaxCommitmentAgeTooLow()
```

## MaxCommitmentAgeTooHigh

```solidity
error MaxCommitmentAgeTooHigh()
```

## Web3RegistrarController

_A registrar controller for registering and renewing names at fixed cost._

### MIN_REGISTRATION_DURATION

```solidity
uint256 MIN_REGISTRATION_DURATION
```

### ETH_NODE

```solidity
bytes32 ETH_NODE
```

### MAX_EXPIRY

```solidity
uint64 MAX_EXPIRY
```

### base

```solidity
contract BaseRegistrarImplementation base
```

### prices

```solidity
contract IFiatPriceOracle prices
```

### minCommitmentAge

```solidity
uint256 minCommitmentAge
```

### maxCommitmentAge

```solidity
uint256 maxCommitmentAge
```

### reverseRegistrar

```solidity
contract ReverseRegistrar reverseRegistrar
```

### nameWrapper

```solidity
contract INameWrapper nameWrapper
```

### commitments

```solidity
mapping(bytes32 => uint256) commitments
```

### NameRegistered

```solidity
event NameRegistered(string name, bytes32 label, address owner, uint256 baseCost, uint256 premium, uint256 expires)
```

### NameRenewed

```solidity
event NameRenewed(string name, bytes32 label, uint256 cost, uint256 expires)
```

### nameWhitelist

```solidity
contract INameWhitelist nameWhitelist
```

### validLen

```solidity
uint256 validLen
```

### LabelStatus

```solidity
enum LabelStatus {
  Valid,
  TooShort,
  Reserved,
  IllegalChar,
  Locked,
  Registered,
  SoldOut
}
```

### ADMIN_ROLE

```solidity
bytes32 ADMIN_ROLE
```

### constructor

```solidity
constructor(contract BaseRegistrarImplementation _base, contract IFiatPriceOracle _prices, uint256 _minCommitmentAge, uint256 _maxCommitmentAge, contract ReverseRegistrar _reverseRegistrar, contract INameWrapper _nameWrapper) public
```

### initialize

```solidity
function initialize(contract BaseRegistrarImplementation _base, contract IFiatPriceOracle _prices, uint256 _minCommitmentAge, uint256 _maxCommitmentAge, contract ReverseRegistrar _reverseRegistrar, contract INameWrapper _nameWrapper, address _admin) public
```

### _init

```solidity
function _init(contract BaseRegistrarImplementation _base, contract IFiatPriceOracle _prices, uint256 _minCommitmentAge, uint256 _maxCommitmentAge, contract ReverseRegistrar _reverseRegistrar, contract INameWrapper _nameWrapper) internal
```

### rentPrice

```solidity
function rentPrice(string name, uint256 duration) public view returns (struct IPriceOracle.Price price)
```

### valid

```solidity
function valid(string name) public view returns (bool)
```

### available

```solidity
function available(string name) public view returns (bool)
```

### makeCommitment

```solidity
function makeCommitment(string name, address owner, uint256 duration, bytes32 secret, address resolver, bytes[] data, bool reverseRecord, uint16 ownerControlledFuses) public pure returns (bytes32)
```

### makeCommitment

```solidity
function makeCommitment(string name, address owner, uint256 duration, bytes32 secret, address resolver, bytes[] data, bool reverseRecord, uint16 ownerControlledFuses, uint64 wrapperExpiry) public pure returns (bytes32)
```

### commit

```solidity
function commit(bytes32 commitment) public
```

### register

```solidity
function register(string name, address owner, uint256 duration, bytes32 secret, address resolver, bytes[] data, bool reverseRecord, uint16 ownerControlledFuses, uint64 wrapperExpiry) public payable
```

### register

```solidity
function register(string name, address owner, uint256 duration, bytes32 secret, address resolver, bytes[] data, bool reverseRecord, uint16 ownerControlledFuses) public payable
```

### _register

```solidity
function _register(string name, address owner, uint256 duration, bytes32 secret, address resolver, bytes[] data, bool reverseRecord, uint16 ownerControlledFuses) internal returns (uint256)
```

### renew

```solidity
function renew(string name, uint256 duration) external payable
```

### withdraw

```solidity
function withdraw() public
```

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceID) public pure returns (bool)
```

### _consumeCommitment

```solidity
function _consumeCommitment(string name, uint256 duration, bytes32 commitment) internal
```

### _setRecords

```solidity
function _setRecords(address resolverAddress, bytes32 label, bytes[] data) internal
```

### _setReverseRecord

```solidity
function _setReverseRecord(string name, address resolver, address owner) internal
```

### rentPriceInFiat

```solidity
function rentPriceInFiat(string name, uint256 duration) public view returns (struct IPriceOracle.Price price)
```

### labelStatus

```solidity
function labelStatus(string _label) public view returns (enum Web3RegistrarController.LabelStatus)
```

### renewWithFiat

```solidity
function renewWithFiat(string name, uint256 duration, uint32 fuses, uint64 wrapperExpiry) public
```

### registerWithFiat

```solidity
function registerWithFiat(string name, address owner, uint256 duration, bytes32 secret, address resolver, bytes[] data, bool reverseRecord, uint16 fuses, uint64 wrapperExpiry) public
```

### setCommitmentAge

```solidity
function setCommitmentAge(uint256 _minCommitmentAge, uint256 _maxCommitmentAge) public
```

### setNameWhitelist

```solidity
function setNameWhitelist(contract INameWhitelist _nameWhitelist) public
```

### setPriceOracle

```solidity
function setPriceOracle(contract IFiatPriceOracle _prices) public
```

### setValidLen

```solidity
function setValidLen(uint256 _len) public
```

### addAdmin

```solidity
function addAdmin(address addr) public
```

## ICNameWrapper

### tokenCount

```solidity
function tokenCount() external view returns (uint256)
```

## NameWhitelist

### ZERO_WIDTH_SPACE

```solidity
bytes ZERO_WIDTH_SPACE
```

### CHAR_WHITE_LIST

```solidity
string CHAR_WHITE_LIST
```

### EMOJI_WHITE_LIST

```solidity
string EMOJI_WHITE_LIST
```

### whiteList

```solidity
mapping(string => bool) whiteList
```

### specialNames

```solidity
mapping(bytes32 => bool) specialNames
```

### constructor

```solidity
constructor() public
```

### checkIfZeroNotPresent

```solidity
function checkIfZeroNotPresent(string _name) public pure returns (bool)
```

### checkContainBytes

```solidity
function checkContainBytes(string toCheck, bytes toFind) public pure returns (bool)
```

### isLabelValid

```solidity
function isLabelValid(string _label) public view returns (bool)
```

### isInWhiteList

```solidity
function isInWhiteList(string toCheck) public view returns (bool)
```

### isReserved

```solidity
function isReserved(string label) public view returns (bool)
```

### setSpecialName

```solidity
function setSpecialName(bytes32 name, bool isSpecial) public
```

### setSpecialNameBatch

```solidity
function setSpecialNameBatch(bytes32[] names, bool isSpecial) public
```

### setWhiteList

```solidity
function setWhiteList(string char, bool isWhite) public
```

### setWhiteListBatch

```solidity
function setWhiteListBatch(string chars, bool isWhite) public
```

### keccak

```solidity
function keccak(string str) private pure returns (bytes32)
```

## CNSPublicResolver

### COIN_TYPE_CFX

```solidity
uint256 COIN_TYPE_CFX
```

### constructor

```solidity
constructor(contract ENS _ens, contract INameWrapper wrapperAddress, address _trustedETHController, address _trustedReverseRegistrar) public
```

### setAddr

```solidity
function setAddr(bytes32 node, address a) external virtual
```

Sets the address associated with an ENS node.
May only be called by the owner of that node in the ENS registry.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| node | bytes32 | The node to update. |
| a | address | The address to set. |

### addr

```solidity
function addr(bytes32 node) public view virtual returns (address payable)
```

Returns the address associated with an ENS node.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| node | bytes32 | The ENS node to query. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address payable | The associated address. |

## CNSUtil

### ens

```solidity
contract ENS ens
```

### baseRegistrar

```solidity
contract IBaseRegistrar baseRegistrar
```

### constructor

```solidity
constructor(address _ens, address _base) public
```

### addr

```solidity
function addr(bytes32 node) public view returns (address)
```

### addr

```solidity
function addr(bytes32 node, uint256 coinType) public view returns (bytes)
```

### addrBatch

```solidity
function addrBatch(bytes32[] nodes) public view returns (address[])
```

### ownerOf

```solidity
function ownerOf(uint256 tokenId) public view returns (address)
```

### setENS

```solidity
function setENS(address _ens) public
```

### setBaseRegistrar

```solidity
function setBaseRegistrar(address _base) public
```

## Strings

### slice

```solidity
struct slice {
  uint256 _len;
  uint256 _ptr;
}
```

### toSlice

```solidity
function toSlice(string self) internal pure returns (struct Strings.slice)
```

### keccak

```solidity
function keccak(struct Strings.slice self) internal pure returns (bytes32 ret)
```

### empty

```solidity
function empty(struct Strings.slice self) internal pure returns (bool)
```

### rfindPtr

```solidity
function rfindPtr(uint256 selflen, uint256 selfptr, uint256 needlelen, uint256 needleptr) private pure returns (uint256)
```

### rsplit

```solidity
function rsplit(struct Strings.slice self, struct Strings.slice needle, struct Strings.slice token) internal pure returns (struct Strings.slice)
```

## Namehash

### namehash

```solidity
function namehash(string name) internal pure returns (bytes32 hash)
```

## ReverseRecords

### ens

```solidity
contract ENS ens
```

### registrar

```solidity
contract ReverseRegistrar registrar
```

### ADDR_REVERSE_NODE

```solidity
bytes32 ADDR_REVERSE_NODE
```

### constructor

```solidity
constructor(contract ENS _ens) public
```

The `constructor` takes ENS registry address

### getNames

```solidity
function getNames(address[] addresses) external view returns (string[] r)
```

Read only function to return ens name only if both forward and reverse resolution are set     *

### node

```solidity
function node(address addr) private pure returns (bytes32)
```

### sha3HexAddress

```solidity
function sha3HexAddress(address addr) private pure returns (bytes32 ret)
```

## Lock

### unlockTime

```solidity
uint256 unlockTime
```

### owner

```solidity
address payable owner
```

### Withdrawal

```solidity
event Withdrawal(uint256 amount, uint256 when)
```

### NewPriceOracle

```solidity
event NewPriceOracle(address oracle)
```

### names

```solidity
struct EnumerableStringSet.StringSet names
```

### constructor

```solidity
constructor(uint256 _unlockTime) public payable
```

### withdraw

```solidity
function withdraw() public
```

### addName

```solidity
function addName(string name) public
```

### removeName

```solidity
function removeName(string name) public
```

### containsName

```solidity
function containsName(string name) public view returns (bool)
```

### getNames

```solidity
function getNames() public view returns (string[])
```

## EnumerableStringSet

### Set

```solidity
struct Set {
  string[] _values;
  mapping(string => uint256) _indexes;
}
```

### _add

```solidity
function _add(struct EnumerableStringSet.Set set, string value) private returns (bool)
```

_Add a value to a set. O(1).

Returns true if the value was added to the set, that is if it was not
already present._

### _remove

```solidity
function _remove(struct EnumerableStringSet.Set set, string value) private returns (bool)
```

_Removes a value from a set. O(1).

Returns true if the value was removed from the set, that is if it was
present._

### _contains

```solidity
function _contains(struct EnumerableStringSet.Set set, string value) private view returns (bool)
```

_Returns true if the value is in the set. O(1)._

### _length

```solidity
function _length(struct EnumerableStringSet.Set set) private view returns (uint256)
```

_Returns the number of values on the set. O(1)._

### _at

```solidity
function _at(struct EnumerableStringSet.Set set, uint256 index) private view returns (string)
```

_Returns the value stored at position `index` in the set. O(1).

Note that there are no guarantees on the ordering of values inside the
array, and it may change when more values are added or removed.

Requirements:

- `index` must be strictly less than {length}._

### _values

```solidity
function _values(struct EnumerableStringSet.Set set) private view returns (string[])
```

_Return the entire set in an array

WARNING: This operation will copy the entire storage to memory, which can be quite expensive. This is designed
to mostly be used by view accessors that are queried without any gas fees. Developers should keep in mind that
this function has an unbounded cost, and using it as part of a state-changing function may render the function
uncallable if the set grows to a point where copying to memory consumes too much gas to fit in a block._

### _values

```solidity
function _values(struct EnumerableStringSet.Set set, uint256 start, uint256 limit) private view returns (string[])
```

### StringSet

```solidity
struct StringSet {
  struct EnumerableStringSet.Set _inner;
}
```

### add

```solidity
function add(struct EnumerableStringSet.StringSet set, string value) internal returns (bool)
```

_Add a value to a set. O(1).

Returns true if the value was added to the set, that is if it was not
already present._

### remove

```solidity
function remove(struct EnumerableStringSet.StringSet set, string value) internal returns (bool)
```

_Removes a value from a set. O(1).

Returns true if the value was removed from the set, that is if it was
present._

### contains

```solidity
function contains(struct EnumerableStringSet.StringSet set, string value) internal view returns (bool)
```

_Returns true if the value is in the set. O(1)._

### length

```solidity
function length(struct EnumerableStringSet.StringSet set) internal view returns (uint256)
```

_Returns the number of values in the set. O(1)._

### at

```solidity
function at(struct EnumerableStringSet.StringSet set, uint256 index) internal view returns (string)
```

_Returns the value stored at position `index` in the set. O(1).

Note that there are no guarantees on the ordering of values inside the
array, and it may change when more values are added or removed.

Requirements:

- `index` must be strictly less than {length}._

### values

```solidity
function values(struct EnumerableStringSet.StringSet set) internal view returns (string[])
```

_Return the entire set in an array

WARNING: This operation will copy the entire storage to memory, which can be quite expensive. This is designed
to mostly be used by view accessors that are queried without any gas fees. Developers should keep in mind that
this function has an unbounded cost, and using it as part of a state-changing function may render the function
uncallable if the set grows to a point where copying to memory consumes too much gas to fit in a block._

### values

```solidity
function values(struct EnumerableStringSet.StringSet set, uint256 start, uint256 limit) internal view returns (string[])
```

## Proxy1967

### constructor

```solidity
constructor(address logic, bytes data) public
```

### implementation

```solidity
function implementation() public view returns (address)
```

### upgradeTo

```solidity
function upgradeTo(address newImplementation) public
```

## CFXPriceOracle

### value

```solidity
int256 value
```

### constructor

```solidity
constructor(int256 _value) public
```

### set

```solidity
function set(int256 _value) public
```

### latestAnswer

```solidity
function latestAnswer() public view returns (int256)
```

## AggregatorInterface

### latestAnswer

```solidity
function latestAnswer() external view returns (int256)
```

## StablePriceOracle

### price1Letter

```solidity
uint256 price1Letter
```

### price2Letter

```solidity
uint256 price2Letter
```

### price3Letter

```solidity
uint256 price3Letter
```

### price4Letter

```solidity
uint256 price4Letter
```

### price5Letter

```solidity
uint256 price5Letter
```

### fiatPrice1Letter

```solidity
uint256 fiatPrice1Letter
```

### fiatPrice2Letter

```solidity
uint256 fiatPrice2Letter
```

### fiatPrice3Letter

```solidity
uint256 fiatPrice3Letter
```

### fiatPrice4Letter

```solidity
uint256 fiatPrice4Letter
```

### fiatPrice5Letter

```solidity
uint256 fiatPrice5Letter
```

### usdOracle

```solidity
contract AggregatorInterface usdOracle
```

### RentPriceChanged

```solidity
event RentPriceChanged(uint256[] prices, uint8 priceType)
```

### constructor

```solidity
constructor(contract AggregatorInterface _usdOracle, uint256[] _rentPrices) public
```

### price

```solidity
function price(string name, uint256 expires, uint256 duration) external view returns (struct IPriceOracle.Price)
```

_Returns the price to register or renew a name._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| name | string | The name being registered or renewed. |
| expires | uint256 | When the name presently expires (0 if this is a new registration). |
| duration | uint256 | How long the name is being registered or extended for, in seconds. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct IPriceOracle.Price | base premium tuple of base price + premium price |

### priceInFiat

```solidity
function priceInFiat(string name, uint256 expires, uint256 duration) external view returns (struct IPriceOracle.Price)
```

### premium

```solidity
function premium(string name, uint256 expires, uint256 duration) external view returns (uint256)
```

_Returns the pricing premium in wei._

### _premium

```solidity
function _premium(string name, uint256 expires, uint256 duration) internal view virtual returns (uint256)
```

_Returns the pricing premium in internal base units._

### attoUSDToWei

```solidity
function attoUSDToWei(uint256 amount) internal view returns (uint256)
```

### weiToAttoUSD

```solidity
function weiToAttoUSD(uint256 amount) internal view returns (uint256)
```

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceID) public view virtual returns (bool)
```

### setRentPrice

```solidity
function setRentPrice(uint256[] _rentPrices) public
```

### setFiatRentPrice

```solidity
function setFiatRentPrice(uint256[] _rentPrices) public
```

