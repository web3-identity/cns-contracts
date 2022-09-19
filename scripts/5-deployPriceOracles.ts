import hre from 'hardhat';
import { logReceipt } from './utils';
const {
  conflux,    // The Conflux instance
} = hre;

async function main() {
  // @ts-ignore
  const accounts = await conflux.getSigners();
  
  // @ts-ignore
  const DummyOracle = await conflux.getContractFactory('DummyOracle');
  const receipt1 = await DummyOracle.constructor(10000).sendTransaction({
    from: accounts[0].address,
  }).executed();
  logReceipt(receipt1, 'DummyOracle');

  // @ts-ignore
  const StablePriceOracle = await conflux.getContractFactory('StablePriceOracle');
  const prices = [1000000, 100000, 10000, 1000, 100, 10];
  const receipt = await StablePriceOracle.constructor(receipt1.contractCreated, prices).sendTransaction({
    from: accounts[0].address,
  }).executed();
  
  logReceipt(receipt, 'StablePriceOracle');
}

main().catch(console.log);