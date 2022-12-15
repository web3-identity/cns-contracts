import hre from 'hardhat';
import { logReceipt } from '../utils';
const {
  conflux,    // The Conflux instance
} = hre;

const { ENS_REGISTRY, NAME_WRAPPER, WEB3_CONTROLLER, REVERSE_REGISTRAR } = process.env;

async function main() {
  // @ts-ignore
  const [account] = await conflux.getSigners();
  // @ts-ignore
  const PublicResolver = await conflux.getContractFactory('CNSPublicResolver');
  const receipt = await PublicResolver.constructor(ENS_REGISTRY, NAME_WRAPPER, WEB3_CONTROLLER, REVERSE_REGISTRAR).sendTransaction({
    from: account.address,
  }).executed();
  
  logReceipt(receipt, 'PublicResolver');
}

main().catch(console.log);