import hre from 'hardhat';
import { logReceipt } from '../utils';
const {
  conflux,    // The Conflux instance
} = hre;

const DEFAULT_TOKEN_URI = 'http://a.xyz/{id}.json';

async function main() {
  // @ts-ignore
  const [account] = await conflux.getSigners();
  
  // @ts-ignore
  const StaticMetadataService = await conflux.getContractFactory('StaticMetadataService');
  const receipt1 = await StaticMetadataService.constructor(DEFAULT_TOKEN_URI).sendTransaction({
    from: account.address,
  }).executed();
  logReceipt(receipt1, 'StaticMetadataService');
  const staticMetadataServiceAddr = receipt1.contractCreated;

  const {ENS_REGISTRY, BASE_REGISTRAR} = process.env;

  // @ts-ignore
  const NameWrapper = await conflux.getContractFactory('NameWrapper');
  const receipt = await NameWrapper.constructor(process.env.ENS_REGISTRY, process.env.BASE_REGISTRAR, staticMetadataServiceAddr).sendTransaction({
    from: account.address,
  }).executed();
  logReceipt(receipt, 'NameWrapper Implementation');

  const implAddr = receipt.contractCreated;

  // @ts-ignore
  const contract = await conflux.getContractAt('NameWrapper', implAddr);
  const initData = contract.initialize(ENS_REGISTRY, BASE_REGISTRAR, staticMetadataServiceAddr).data;
  // @ts-ignore
  const Proxy1967 = await conflux.getContractFactory('Proxy1967');
  const receipt2 = await Proxy1967.constructor(implAddr, initData).sendTransaction({
      from: account.address,
  }).executed();
  logReceipt(receipt2, 'NameWrapper');
}

main().catch(console.log);