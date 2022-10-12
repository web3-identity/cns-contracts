import hre from 'hardhat';
import { logReceipt } from '../utils';
const {
  conflux,    // The Conflux instance
} = hre;

const DEFAULT_TOKEN_URI = 'http://a.xyz/{id}.json';

async function main() {
  // @ts-ignore
  const accounts = await conflux.getSigners();
  const account = accounts[0];
  
  // @ts-ignore
  const StaticMetadataService = await conflux.getContractFactory('StaticMetadataService');
  const receipt1 = await StaticMetadataService.constructor(DEFAULT_TOKEN_URI).sendTransaction({
    from: account.address,
  }).executed();
  logReceipt(receipt1, 'StaticMetadataService');

  // @ts-ignore
  const NameWrapper = await conflux.getContractFactory('NameWrapper');
  const receipt = await NameWrapper.constructor(process.env.ENS_REGISTRY, process.env.BASE_REGISTRAR, receipt1.contractCreated).sendTransaction({
    from: account.address,
  }).executed();
  
  logReceipt(receipt, 'NameWrapper');
}

main().catch(console.log);