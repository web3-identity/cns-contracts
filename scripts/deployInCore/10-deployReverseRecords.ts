import hre from 'hardhat';
import { logReceipt } from '../utils';
const {
  conflux,    // The Conflux instance
} = hre;

const { ENS_REGISTRY } = process.env;

async function main() {
  // @ts-ignore
  const [account] = await conflux.getSigners();
  // @ts-ignore
  const ReverseRecords = await conflux.getContractFactory('ReverseRecords');
  const receipt = await ReverseRecords.constructor(ENS_REGISTRY).sendTransaction({
    from: account.address,
  }).executed();
  
  logReceipt(receipt, 'ReverseRecords');
}

main().catch(console.log);