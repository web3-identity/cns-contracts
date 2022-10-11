# Solidity API

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
function getController() internal view returns (contract ETHRegistrarController)
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

## NameLocked

```solidity
error NameLocked(string name)
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

## InvalidLabel

```solidity
error InvalidLabel(string name)
```

## ETHRegistrarController

_A registrar controller for registering and renewing names at fixed cost._

### LabelStatus

```solidity
enum LabelStatus {
  Valid,
  TooShort,
  Reserved,
  IllegalChar,
  Locked,
  Registered
}
```

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
contract IPriceOracle prices
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

### nameWhitelist

```solidity
contract INameWhitelist nameWhitelist
```

### commitments

```solidity
mapping(bytes32 => uint256) commitments
```

### labelCommitments

```solidity
mapping(bytes32 => uint256) labelCommitments
```

### NameRegistered

```solidity
event NameRegistered(string name, bytes32 label, address owner, uint256 baseCost, uint256 premium, uint256 expires)
```

### NameRenewed

```solidity
event NameRenewed(string name, bytes32 label, uint256 cost, uint256 expires)
```

### constructor

```solidity
constructor(contract BaseRegistrarImplementation _base, contract IPriceOracle _prices, uint256 _minCommitmentAge, uint256 _maxCommitmentAge, contract ReverseRegistrar _reverseRegistrar, contract INameWrapper _nameWrapper) public
```

### initialize

```solidity
function initialize(contract BaseRegistrarImplementation _base, contract IPriceOracle _prices, uint256 _minCommitmentAge, uint256 _maxCommitmentAge, contract ReverseRegistrar _reverseRegistrar, contract INameWrapper _nameWrapper) public
```

### _init

```solidity
function _init(contract BaseRegistrarImplementation _base, contract IPriceOracle _prices, uint256 _minCommitmentAge, uint256 _maxCommitmentAge, contract ReverseRegistrar _reverseRegistrar, contract INameWrapper _nameWrapper) internal
```

### setCommitmentAge

```solidity
function setCommitmentAge(uint256 _minCommitmentAge, uint256 _maxCommitmentAge) public
```

### setNameWhitelist

```solidity
function setNameWhitelist(contract INameWhitelist _nameWhitelist) public
```

### rentPrice

```solidity
function rentPrice(string name, uint256 duration) public view returns (struct IPriceOracle.Price price)
```

### valid

```solidity
function valid(string name) public pure returns (bool)
```

### available

```solidity
function available(string name) public view returns (bool)
```

### labelAvailable

```solidity
function labelAvailable(bytes32 label) public view returns (bool)
```

### labelStatus

```solidity
function labelStatus(string _label) public view returns (enum ETHRegistrarController.LabelStatus)
```

### makeCommitment

```solidity
function makeCommitment(string name, address owner, uint256 duration, bytes32 secret, address resolver, bytes[] data, bool reverseRecord, uint32 fuses, uint64 wrapperExpiry) public view returns (bytes32)
```

### commit

```solidity
function commit(bytes32 commitment) public
```

### commitWithName

```solidity
function commitWithName(bytes32 commitment, bytes32 label) public
```

### register

```solidity
function register(string name, address owner, uint256 duration, bytes32 secret, address resolver, bytes[] data, bool reverseRecord, uint32 fuses, uint64 wrapperExpiry) public payable
```

### registerWithFiat

```solidity
function registerWithFiat(string name, address owner, uint256 duration, bytes32 secret, address resolver, bytes[] data, bool reverseRecord, uint32 fuses, uint64 wrapperExpiry) public
```

### _register

```solidity
function _register(string name, address owner, uint256 duration, bytes32 secret, address resolver, bytes[] data, bool reverseRecord, uint32 fuses, uint64 wrapperExpiry) internal returns (uint256)
```

### renew

```solidity
function renew(string name, uint256 duration) external payable
```

### renewWithFiat

```solidity
function renewWithFiat(string name, uint256 duration, uint32 fuses, uint64 wrapperExpiry) public
```

### renewWithFuses

```solidity
function renewWithFuses(string name, uint256 duration, uint32 fuses, uint64 wrapperExpiry) external payable
```

### _renew

```solidity
function _renew(string name, uint256 duration, uint32 fuses, uint64 wrapperExpiry) internal
```

### withdraw

```solidity
function withdraw() public
```

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceID) external pure returns (bool)
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

## Unauthorised

```solidity
error Unauthorised(bytes32 node, address addr)
```

## NameNotFound

```solidity
error NameNotFound()
```

## IncompatibleParent

```solidity
error IncompatibleParent()
```

## IncompatibleName

```solidity
error IncompatibleName(bytes name)
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

### ETH_NODE

```solidity
bytes32 ETH_NODE
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

### userNodes

```solidity
mapping(address => struct EnumerableSet.Bytes32Set) userNodes
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

### getData

```solidity
function getData(uint256 id) public view returns (address, uint32, uint64)
```

Gets the data for a name

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | uint256 | Label as a string of the .eth domain to wrap |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | address The owner of the name |
| [1] | uint32 | uint32 Fuses of the name |
| [2] | uint64 | uint64 Expiry of when the fuses expire for the name |

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

### isTokenOwnerOrApproved

```solidity
function isTokenOwnerOrApproved(bytes32 node, address addr) public view returns (bool)
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
function wrapETH2LD(string label, address wrappedOwner, uint32 fuses, uint64 expiry, address resolver) public returns (uint64)
```

Wraps a .eth domain, creating a new token and sending the original ERC721 token to this contract

_Can be called by the owner of the name on the .eth registrar or an authorised caller on the registrar_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| label | string | Label as a string of the .eth domain to wrap |
| wrappedOwner | address | Owner of the name in this contract |
| fuses | uint32 | Initial fuses to set |
| expiry | uint64 | When the fuses will expire |
| resolver | address | Resolver contract address |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint64 | Normalised expiry of when the fuses expire |

### registerAndWrapETH2LD

```solidity
function registerAndWrapETH2LD(string label, address wrappedOwner, uint256 duration, address resolver, uint32 fuses, uint64 expiry) external returns (uint256 registrarExpiry)
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
| fuses | uint32 | Initial fuses to set |
| expiry | uint64 | When the fuses will expire |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| registrarExpiry | uint256 | The expiry date of the new name on the .eth registrar, in seconds since the Unix epoch. |

### renew

```solidity
function renew(uint256 tokenId, uint256 duration, uint32 fuses, uint64 expiry) external returns (uint256 expires)
```

Renews a .eth second-level domain.

_Only callable by authorised controllers._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | The hash of the label to register (eg, `keccak256('foo')`, for 'foo.eth'). |
| duration | uint256 | The number of seconds to renew the name for. |
| fuses | uint32 |  |
| expiry | uint64 |  |

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
function setFuses(bytes32 node, uint32 fuses) public returns (uint32)
```

Sets fuses of a name

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| node | bytes32 | Namehash of the name |
| fuses | uint32 | Fuses to burn (cannot burn PARENT_CANNOT_CONTROL) |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint32 | New fuses |

### upgradeETH2LD

```solidity
function upgradeETH2LD(string label, address wrappedOwner, address resolver) public
```

Upgrades a .eth wrapped domain by calling the wrapETH2LD function of the upgradeContract
    and burning the token of this contract

_Can be called by the owner of the name in this contract_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| label | string | Label as a string of the .eth name to upgrade |
| wrappedOwner | address | The owner of the wrapped name |
| resolver | address |  |

### upgrade

```solidity
function upgrade(bytes32 parentNode, string label, address wrappedOwner, address resolver) public
```

Upgrades a non .eth domain of any kind. Could be a DNSSEC name vitalik.xyz or a subdomain

_Can be called by the owner or an authorised caller
Requires upgraded Namewrapper to permit old Namewrapper to call `setSubnodeRecord` for all names_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| parentNode | bytes32 | Namehash of the parent name |
| label | string | Label as a string of the name to upgrade |
| wrappedOwner | address | Owner of the name in this contract |
| resolver | address | Resolver contract for this name |

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
| expiry | uint64 | When the fuses will expire |

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
| expiry | uint64 | When the fuses will expire |

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
| ttl | uint64 | ttl in the regsitry |
| fuses | uint32 | initial fuses for the wrapped subdomain |
| expiry | uint64 | expiry date for the domain |

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

### canCallSetSubnodeOwner

```solidity
modifier canCallSetSubnodeOwner(bytes32 node, bytes32 labelhash)
```

Check whether a name can call setSubnodeOwner/setSubnodeRecord

_Checks both CANNOT_CREATE_SUBDOMAIN and PARENT_CANNOT_CONTROL and whether not they have been burnt
     and checks whether the owner of the subdomain is 0x0 for creating or already exists for
     replacing a subdomain. If either conditions are true, then it is possible to call
     setSubnodeOwner_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| node | bytes32 | Namehash of the name to check |
| labelhash | bytes32 | Labelhash of the name to check |

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

Checks if a name is wrapped or not

_Both of these checks need to be true to be considered wrapped if checked without this contract_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| node | bytes32 | Namehash of the name |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | Boolean of whether or not the name is wrapped |

### onERC721Received

```solidity
function onERC721Received(address to, address, uint256 tokenId, bytes data) public returns (bytes4)
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

### _canTransfer

```solidity
function _canTransfer(uint32 fuses) internal pure returns (bool)
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

### _burn

```solidity
function _burn(uint256 tokenId) internal
```

### _wrap

```solidity
function _wrap(bytes32 node, bytes name, address wrappedOwner, uint32 fuses, uint64 expiry) internal
```

### _addLabelAndWrap

```solidity
function _addLabelAndWrap(bytes32 parentNode, bytes32 node, string label, address owner, uint32 fuses, uint64 expiry) internal
```

### _prepareUpgrade

```solidity
function _prepareUpgrade(bytes32 node) private returns (uint32 fuses, uint64 expiry)
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

### _getETH2LDDataAndNormaliseExpiry

```solidity
function _getETH2LDDataAndNormaliseExpiry(bytes32 node, bytes32 labelhash, uint64 expiry) internal view returns (address owner, uint32 fuses, uint64)
```

### _normaliseExpiry

```solidity
function _normaliseExpiry(uint64 expiry, uint64 oldExpiry, uint64 maxExpiry) internal pure returns (uint64)
```

### _wrapETH2LD

```solidity
function _wrapETH2LD(string label, address wrappedOwner, uint32 fuses, uint64 expiry, address resolver) private returns (uint64)
```

### _unwrap

```solidity
function _unwrap(bytes32 node, address owner) private
```

### _setFuses

```solidity
function _setFuses(bytes32 node, address owner, uint32 fuses, uint64 expiry) internal
```

### _setData

```solidity
function _setData(bytes32 node, address owner, uint32 fuses, uint64 expiry) internal
```

### _canFusesBeBurned

```solidity
function _canFusesBeBurned(bytes32 node, uint32 fuses) internal pure
```

### _checkForParentCannotControl

```solidity
function _checkForParentCannotControl(bytes32 node, uint32 fuses) internal view
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
mapping(string => bool) specialNames
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
function setSpecialName(string name, bool isSpecial) public
```

### setSpecialNameBatch

```solidity
function setSpecialNameBatch(string[] names, bool isSpecial) public
```

### setWhiteList

```solidity
function setWhiteList(string name, bool isWhite) public
```

### setWhiteListBatch

```solidity
function setWhiteListBatch(string name, bool isWhite) public
```

## CharWhitelist

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
mapping(string => bool) specialNames
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
function setSpecialName(string name, bool isSpecial) public
```

### setSpecialNameBatch

```solidity
function setSpecialNameBatch(string[] names, bool isSpecial) public
```

### setWhiteList

```solidity
function setWhiteList(string name, bool isWhite) public
```

### setWhiteListBatch

```solidity
function setWhiteListBatch(string name, bool isWhite) public
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

### usdOracle

```solidity
contract AggregatorInterface usdOracle
```

### RentPriceChanged

```solidity
event RentPriceChanged(uint256[] prices)
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

