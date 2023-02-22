import hre from 'hardhat';
import { logReceipt } from '../utils';
const {
  conflux,    // The Conflux instance
} = hre;

const {
    ENS_REGISTRY,
    BASE_REGISTRAR,
    STATIC_METADATA_SERVICE,
    NAME_WRAPPER,
} = process.env;

async function main() {
    // @ts-ignore
    const accounts = await conflux.getSigners();
    const account = accounts[0];

    // @ts-ignore
    const NameWrapper = await conflux.getContractFactory('NameWrapper');
    const receipt = await NameWrapper.constructor(
        ENS_REGISTRY, 
        BASE_REGISTRAR, 
        STATIC_METADATA_SERVICE, 
    ).sendTransaction({
        from: account.address,
    }).executed();
    
    logReceipt(receipt, 'NameWrapper new impl');

    const implAddr = receipt.contractCreated;

    // @ts-ignore
    const controllerProxy = await conflux.getContractAt('Proxy1967', NAME_WRAPPER);
    const receipt2 = await controllerProxy.upgradeTo(implAddr).sendTransaction({
        from: account.address,
    })
    .executed();
    logReceipt(receipt2, `NameWrapper upgrade to new implementation ${implAddr}`);
}

main().catch(console.log);