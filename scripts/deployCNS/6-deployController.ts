import hre from 'hardhat';
import { logReceipt } from '../utils';
const {
  conflux,    // The Conflux instance
} = hre;

async function main() {
  // @ts-ignore
  const accounts = await conflux.getSigners();
  // @ts-ignore
  const WEB3RegistrarController = await conflux.getContractFactory('ETHRegistrarController');
  const minCommitmentAge = 120 // s
  const maxCommitmentAge = 3600 * 10; // s
  const receipt = await WEB3RegistrarController.constructor(process.env.BASE_REGISTRAR, process.env.STABLE_ORACLE, minCommitmentAge, maxCommitmentAge, process.env.REVERSE_REGISTRAR, process.env.NAME_WRAPPER).sendTransaction({
    from: accounts[0].address,
  }).executed();
  
  logReceipt(receipt, 'WEB3RegistrarController');
}

main().catch(console.log);