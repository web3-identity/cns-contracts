import hre from 'hardhat';
import { logReceipt } from '../utils';
const {
  conflux,    // The Conflux instance
} = hre;

async function main() {
  // @ts-ignore
  const [account] = await conflux.getSigners();
  
  // @ts-ignore
  const DummyOracle = await conflux.getContractFactory('CFXPriceOracle');
  const cfxPrice = BigInt(0.0001 * 1e8);
  const receipt1 = await DummyOracle.constructor(cfxPrice).sendTransaction({
    from: account.address,
  }).executed();
  logReceipt(receipt1, 'CFXPriceOracle');

  const contractPath = 'contracts/web3registrar/StablePirceOracles.sol:StablePriceOracle';
  // @ts-ignore
  const StablePriceOracle = await conflux.getContractFactory(contractPath);
  let pricesForOneYear = [10000n, 1000n, 100n, 10n, 1n];  // usd
  for(let i = 0; i < pricesForOneYear.length; i++) {
    pricesForOneYear[i] = pricesForOneYear[i] * BigInt(1e18) / (3600n * 24n * 365n);
  }
  const receipt = await StablePriceOracle.constructor(receipt1.contractCreated, pricesForOneYear).sendTransaction({
    from: account.address,
  }).executed();
  
  logReceipt(receipt, 'StablePriceOracle');

    // @ts-ignore
    const stablePriceOracle = await conflux.getContractAt(contractPath, receipt.contractCreated);
    let fiatpricesForOneYear = [10000n, 6100n, 3600n, 600n, 30n];  // cny
    for(let i = 0; i < fiatpricesForOneYear.length; i++) {
        fiatpricesForOneYear[i] = fiatpricesForOneYear[i] * BigInt(1e8) / (3600n * 24n * 365n);
    }
    const receipt2 = await stablePriceOracle.setFiatRentPrice(fiatpricesForOneYear).sendTransaction({
        from: account.address,
    }).executed();
    logReceipt(receipt2, 'StablePriceOracle setFiatPrice');
}

main().catch(console.log);