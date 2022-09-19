import hre from 'hardhat';
import { logReceipt } from './utils';
const {
  conflux,    // The Conflux instance
} = hre;

const WEB3_NAMEHASH = '0x587d09fe5fa45354680537d38145a28b772971e0f293af3ee0c536fc919710fb';

async function main() {
  // @ts-ignore
  const accounts = await conflux.getSigners();
  // @ts-ignore
  const BaseRegistrarImplementation = await conflux.getContractFactory('BaseRegistrarImplementation');
  const receipt = await BaseRegistrarImplementation.constructor(process.env.ENS_REGISTRY, WEB3_NAMEHASH).sendTransaction({
    from: accounts[0].address,
  }).executed();
  
  logReceipt(receipt);
}

main().catch(console.log);