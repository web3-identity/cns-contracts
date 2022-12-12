import hre from 'hardhat';
import { logReceipt } from '../utils';
import {
    WEB3_NAMEHASH
} from '../utils';
const {
    conflux,    // The Conflux instance
  } = hre;

async function main() {
  // @ts-ignore
  const [account] = await conflux.getSigners();
  // @ts-ignore
  const BaseRegistrarImplementation = await conflux.getContractFactory('BaseRegistrarImplementation');
  const receipt = await BaseRegistrarImplementation.constructor(process.env.ENS_REGISTRY, WEB3_NAMEHASH).sendTransaction({
    from: account.address,
  }).executed();
  
  logReceipt(receipt, 'BaseRegistrarImplementation');
}

main().catch(console.log);