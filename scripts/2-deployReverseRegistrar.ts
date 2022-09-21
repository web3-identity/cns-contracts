import hre from 'hardhat';
import { logReceipt } from './utils';
const {
  conflux,    // The Conflux instance
} = hre;

async function main() {
  // @ts-ignore
  const accounts = await conflux.getSigners();
  // @ts-ignore
  const ReverseRegistrar = await conflux.getContractFactory('ReverseRegistrar');
  const receipt = await ReverseRegistrar.constructor(process.env.ENS_REGISTRY).sendTransaction({
    from: accounts[0].address,
  }).executed();
  
  logReceipt(receipt, 'ReverseRegistrar');
}

main().catch(console.log);