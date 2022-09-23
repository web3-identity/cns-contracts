import { Conflux } from 'js-conflux-sdk';
import { getContractMetadata } from '../utils';

const { 
  RPC_URL,
  NETWORK_ID,
  PRIVATE_KEY,
  ENS_REGISTRY,
  REVERSE_REGISTRAR,
  BASE_REGISTRAR,
  NAME_WRAPPER,
  CFX_PRICE_ORACLE,
  STABLE_ORACLE,
  WEB3_CONTROLLER,
  PUBLIC_RESOLVER,
} = process.env;

export const conflux = new Conflux({
  url: RPC_URL,
  networkId: Number(NETWORK_ID as unknown as number),
});

export const account = conflux.wallet.addPrivateKey(PRIVATE_KEY);

const registryMeta = getContractMetadata('@ensdomains/ens-contracts/contracts/registry/ENSRegistry.sol/ENSRegistry');
const reverseRegistrarMeta = getContractMetadata('@ensdomains/ens-contracts/contracts/registry/ReverseRegistrar.sol/ReverseRegistrar');
const publicResolverMeta = getContractMetadata('@ensdomains/ens-contracts/contracts/resolvers/PublicResolver.sol/PublicResolver');
const baseRegistrarMeta = getContractMetadata('@ensdomains/ens-contracts/contracts/ethregistrar/BaseRegistrarImplementation.sol/BaseRegistrarImplementation');
const web3ControllerMeta = getContractMetadata('contracts/web3registrar/Web3RegistrarController.sol/ETHRegistrarController');
const nameWrapperMeta = getContractMetadata('contracts/wrapper/NameWrapper.sol/NameWrapper');

export const Registry = conflux.Contract({abi: registryMeta.abi, address: ENS_REGISTRY});
export const ReverseRegistrar = conflux.Contract({abi: reverseRegistrarMeta.abi, address: REVERSE_REGISTRAR});
export const PublicResolver = conflux.Contract({abi: publicResolverMeta.abi, address: PUBLIC_RESOLVER});
export const BaseRegistrar = conflux.Contract({abi: baseRegistrarMeta.abi, address: BASE_REGISTRAR});
export const Web3Controller = conflux.Contract({abi: web3ControllerMeta.abi, address: WEB3_CONTROLLER});
export const NameWrapper = conflux.Contract({abi: nameWrapperMeta.abi, address: NAME_WRAPPER});
