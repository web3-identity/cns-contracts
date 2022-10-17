import hre from 'hardhat';

import { 
    logReceipt, 
    ROOT_NODE, 
    labelhash, 
    namehash, 
    REVERSE_NAMEHASH,
} from '../utils';
const {
  conflux,    // The Conflux instance
} = hre;

const {
    WEB3_CONTROLLER,
    BASE_REGISTRAR,
    STABLE_ORACLE,
    REVERSE_REGISTRAR,
    NAME_WRAPPER,
} = process.env;

async function main() {
    // @ts-ignore
    const accounts = await conflux.getSigners();
    const account = accounts[0];

    // @ts-ignore
    const WEB3RegistrarController = await conflux.getContractFactory('Web3RegistrarController');
    const minCommitmentAge = 30; // s
    const maxCommitmentAge = 600; // s
    const receipt = await WEB3RegistrarController.constructor(
        BASE_REGISTRAR, 
        STABLE_ORACLE, 
        minCommitmentAge, 
        maxCommitmentAge, 
        REVERSE_REGISTRAR, 
        NAME_WRAPPER
    ).sendTransaction({
        from: account.address,
    }).executed();
    
    logReceipt(receipt, 'WEB3RegistrarController new impl');

    const implAddr = receipt.contractCreated;

    // @ts-ignore
    const controllerProxy = await conflux.getContractAt('Proxy1967', WEB3_CONTROLLER);
    const receipt2 = await controllerProxy.upgradeTo(implAddr).sendTransaction({
        from: account.address,
    })
    .executed();
    logReceipt(receipt2, `WEB3RegistrarController upgrade to new implementation ${implAddr}`);
}

main().catch(console.log);