import hre from 'hardhat';
import { logReceipt } from '../utils';
const {
  conflux,    // The Conflux instance
} = hre;

async function main() {
  // @ts-ignore
  const accounts = await conflux.getSigners();
  
  // @ts-ignore
  const DummyOracle = await conflux.getContractFactory('CFXPriceOracle');
  const cfxPrice = BigInt(0.05 * 1e8);
  const receipt1 = await DummyOracle.constructor(cfxPrice).sendTransaction({
    from: accounts[0].address,
  }).executed();
  logReceipt(receipt1, 'CFXPriceOracle');

  // @ts-ignore
  const StablePriceOracle = await conflux.getContractFactory('StablePriceOracle');
  let pricesForOneYear = [100000n, 10000n, 1000n, 100n, 10n, 1n];  // usd
  for(let i = 0; i < pricesForOneYear.length; i++) {
    pricesForOneYear[i] = pricesForOneYear[i] * BigInt(1e18) / (3600n * 24n * 365n);
  }
  const receipt = await StablePriceOracle.constructor(receipt1.contractCreated, pricesForOneYear).sendTransaction({
    from: accounts[0].address,
  }).executed();
  
  logReceipt(receipt, 'StablePriceOracle');
}

main().catch(console.log);