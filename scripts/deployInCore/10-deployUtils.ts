import hre from 'hardhat';
import { logReceipt } from '../utils';
const {
  conflux,    // The Conflux instance
} = hre;

const { ENS_REGISTRY, BASE_REGISTRAR } = process.env;

async function main() {
  // @ts-ignore
  const [account] = await conflux.getSigners();
  // @ts-ignore
  const ReverseRecords = await conflux.getContractFactory('ReverseRecords');
  const receipt = await ReverseRecords.constructor(ENS_REGISTRY).sendTransaction({
    from: account.address,
  }).executed();
  
  logReceipt(receipt, 'ReverseRecords');

  // @ts-ignore
  const CNSUtil = await conflux.getContractFactory('CNSUtil');
  const receipt1 = await CNSUtil.constructor(ENS_REGISTRY, BASE_REGISTRAR).sendTransaction({
    from: account.address,
  }).executed();
  
  logReceipt(receipt1, 'CNSUtil');

  // @ts-ignore
  const ReverseRecords = await conflux.getContractFactory('Multicall');
  const receipt2 = await ReverseRecords.constructor().sendTransaction({
    from: account.address,
  }).executed();
  
  logReceipt(receipt2, 'Multicall');
}

main().catch(console.log);