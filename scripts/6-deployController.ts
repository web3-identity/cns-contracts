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
  const WEB3RegistrarController = await conflux.getContractFactory('WEB3RegistrarController');
  const receipt = await WEB3RegistrarController.constructor(process.env.BASE_REGISTRAR, process.env.STABLE_ORACLE, 100, 1000, process.env.REVERSE_REGISTRAR, process.env.NAME_WRAPPER).sendTransaction({
    from: accounts[0].address,
  }).executed();
  
  logReceipt(receipt, 'WEB3RegistrarController');
}

main().catch(console.log);