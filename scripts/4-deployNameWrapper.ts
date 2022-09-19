import hre from 'hardhat';
import { logReceipt } from './utils';
const {
  conflux,    // The Conflux instance
} = hre;

async function main() {
  // @ts-ignore
  const accounts = await conflux.getSigners();
  
  // @ts-ignore
  const StaticMetadataService = await conflux.getContractFactory('StaticMetadataService');
  const receipt1 = await StaticMetadataService.constructor('http://a.xyz/{id}.json').sendTransaction({
    from: accounts[0].address,
  }).executed();
  logReceipt(receipt1, 'StaticMetadataService');

  // @ts-ignore
  const NameWrapper = await conflux.getContractFactory('NameWrapper');
  const receipt = await NameWrapper.constructor(process.env.ENS_REGISTRY, process.env.BASE_REGISTRAR, receipt1.contractCreated).sendTransaction({
    from: accounts[0].address,
  }).executed();
  
  logReceipt(receipt, 'NameWrapper');
}

main().catch(console.log);