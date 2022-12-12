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
    ENS_REGISTRY,
    REVERSE_REGISTRAR,
    BASE_REGISTRAR,
    NAME_WRAPPER,
    WEB3_CONTROLLER,
    PUBLIC_RESOLVER,
    NAME_WHITELIST,
} = process.env;

async function main() {
    // @ts-ignore
    const [account] = await conflux.getSigners();
    
    await setup(account);
}

main().catch(console.log);

async function setup(account: any) {
    // @ts-ignore
    const ENSRegistry = await conflux.getContractAt('ENSRegistry', ENS_REGISTRY);
    // @ts-ignore
    const ReverseRegistrar = await conflux.getContractAt('ReverseRegistrar', REVERSE_REGISTRAR);
    // @ts-ignore
    const BaseRegistrarImplementation = await conflux.getContractAt('BaseRegistrarImplementation', BASE_REGISTRAR);
    // @ts-ignore
    const NameWrapper = await conflux.getContractAt('NameWrapper', NAME_WRAPPER);
    // @ts-ignore
    const ETHRegistrarController = await conflux.getContractAt('Web3RegistrarController', WEB3_CONTROLLER);
    // @ts-ignore
    const PublicResolver = await conflux.getContractAt('PublicResolver', PUBLIC_RESOLVER);

    let receipt;

    // setup .web3
    receipt = await ENSRegistry
        .setSubnodeOwner(ROOT_NODE, labelhash('web3'), BaseRegistrarImplementation.address)
        .sendTransaction({
            from: account.address,
        })
        .executed();
    logReceipt(receipt, 'Set web3 owner to base registrar');

    // setup addr.reverse
    receipt = await ENSRegistry
        .setSubnodeOwner(ROOT_NODE, labelhash('reverse'), account.address)
        .sendTransaction({
            from: account
        })
        .executed();
    logReceipt(receipt, 'Set reverse owner to reverse registrar');

    receipt = await ENSRegistry
        .setSubnodeOwner(namehash('reverse'), labelhash('addr'), ReverseRegistrar.address)
        .sendTransaction({
            from: account
        })
        .executed();
    logReceipt(receipt, 'Set reverse owner to reverse registrar');

    const ownerOfReverse = await ENSRegistry.owner(REVERSE_NAMEHASH);
    console.log('addr.reverse node owner', ownerOfReverse);

    // setup .web3 controller controller
    /* receipt = await BaseRegistrarImplementation
        .addController(ETHRegistrarController.address)
        .sendTransaction({
            from: account
        })
        .executed();
    logReceipt(receipt, 'Add web3 controller to base registrar'); */

    receipt = await BaseRegistrarImplementation
        .addController(NameWrapper.address)
        .sendTransaction({
            from: account
        })
        .executed();
    logReceipt(receipt, 'Add name wrapper to base registrar');

    // name wrapper setup controller
    receipt = await NameWrapper.setController(ETHRegistrarController.address, true)
        .sendTransaction({
            from: account
        })
        .executed();
    logReceipt(receipt, 'Add web3 controller to name wrapper');

    receipt = await ReverseRegistrar.setDefaultResolver(PublicResolver.address)
        .sendTransaction({
            from: account
        })
        .executed();

    receipt = await ReverseRegistrar.setController(ETHRegistrarController.address, true)
        .sendTransaction({
            from: account
        })
        .executed();
    logReceipt(receipt, 'Set default resolver for reverse registrar');

    receipt = await ETHRegistrarController.setNameWhitelist(NAME_WHITELIST).sendTransaction({
        from: account
    })
    .executed();
    logReceipt(receipt, 'Controller set NameWhitelist');

}
