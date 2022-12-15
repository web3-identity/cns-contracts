# cns-contracts

The source code of CoreID Name Domain Contracts.

## npm package

This repo doubles as an npm package with the compiled JSON contracts

```js
import {
  CNS,
  BaseRegistrarImplementation,
  Web3RegistrarController,
  PublicResolver,
  ReverseRegistrar,
  NameWrapper,
} from '@web3identity/cns-contracts'
```

## Importing from solidity

```js
// Registry
import '@web3identity/cns-contracts/contracts/cns/CNS.sol';
```

## Accessing to binary file

If your environment does not have compiler, you can access to the raw hardhat artifacts files at `node_modules/@web3identity/cns-contracts/artifacts/contracts/${modName}/${contractName}.sol/${contractName}.json`

## Contracts

## Registry

The Registry contract is same with [`ENSRegistry.sol`](https://github.com/ensdomains/ens-contracts/tree/master/contracts/registry).

## Contributing

### Install

```bash
yarn
```

### Build

```bash
npm run build
```

### Add config file

```bash
cp .env.example .env
```

Then edit `.env` file. Set `PRIVATE_KEY` to your private key.
