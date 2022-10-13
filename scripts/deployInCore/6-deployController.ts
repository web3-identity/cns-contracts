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
  const WEB3RegistrarController = await conflux.getContractFactory('Web3RegistrarController');
  const minCommitmentAge = 30; // s
  const maxCommitmentAge = 600; // s
  const receipt = await WEB3RegistrarController.constructor(
    process.env.BASE_REGISTRAR, 
    process.env.STABLE_ORACLE, 
    minCommitmentAge, 
    maxCommitmentAge, 
    process.env.REVERSE_REGISTRAR, 
    process.env.NAME_WRAPPER
  ).sendTransaction({
    from: account.address,
  }).executed();
  
  logReceipt(receipt, 'WEB3RegistrarController');

    const implAddr = receipt.contractCreated;
    // @ts-ignore
    const controller = await conflux.getContractAt('Web3RegistrarController', implAddr);
    const controllerInitData = controller.initialize(
        process.env.BASE_REGISTRAR, 
        process.env.STABLE_ORACLE, 
        minCommitmentAge, 
        maxCommitmentAge, 
        process.env.REVERSE_REGISTRAR, 
        process.env.NAME_WRAPPER,
        account.address,
    ).data;
    // @ts-ignore
    const Proxy1967 = await conflux.getContractFactory('Proxy1967');
    const receipt2 = await Proxy1967.constructor(implAddr, controllerInitData).sendTransaction({
        from: account.address,
    }).executed();
    logReceipt(receipt2, 'Web3RegistrarController Proxy');
}

main().catch(console.log);