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
  const WEB3RegistrarController = await conflux.getContractFactory('ETHRegistrarController');
  const minCommitmentAge = 120 // s
  const maxCommitmentAge = 3600 * 2; // s
  const receipt = await WEB3RegistrarController.constructor(process.env.BASE_REGISTRAR, process.env.STABLE_ORACLE, minCommitmentAge, maxCommitmentAge, process.env.REVERSE_REGISTRAR, process.env.NAME_WRAPPER).sendTransaction({
    from: account.address,
  }).executed();
  
  logReceipt(receipt, 'WEB3RegistrarController');
}

main().catch(console.log);