import hre from 'hardhat';
import { logReceipt } from '../utils';
const {
  conflux,    // The Conflux instance
} = hre;

async function main() {
  // @ts-ignore
  const accounts = await conflux.getSigners();
  const account = accounts[0];
  // @ts-ignore
  const PublicResolver = await conflux.getContractFactory('PublicResolver');
  const receipt = await PublicResolver.constructor(process.env.ENS_REGISTRY, process.env.NAME_WRAPPER, process.env.WEB3_CONTROLLER, process.env.REVERSE_REGISTRAR).sendTransaction({
    from: account.address,
  }).executed();
  
  logReceipt(receipt, 'PublicResolver');
}

main().catch(console.log);