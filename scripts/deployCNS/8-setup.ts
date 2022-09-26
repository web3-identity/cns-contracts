import hre from 'hardhat';
import { format, Drip, Contract } from 'js-conflux-sdk'
import { 
    logReceipt, 
    ROOT_NODE, 
    labelhash, 
    namehash, 
    REVERSE_NAMEHASH,
    ONE_YEAR,
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
} = process.env;

async function main() {
    // @ts-ignore
    const accounts = await conflux.getSigners();
    const account = accounts[0];
    // @ts-ignore
    const ENSRegistry = await conflux.getContractAt('ENSRegistry', ENS_REGISTRY);
    // @ts-ignore
    const ReverseRegistrar = await conflux.getContractAt('ReverseRegistrar', REVERSE_REGISTRAR);
    // @ts-ignore
    const BaseRegistrarImplementation = await conflux.getContractAt('BaseRegistrarImplementation', BASE_REGISTRAR);
    // @ts-ignore
    const NameWrapper = await conflux.getContractAt('NameWrapper', NAME_WRAPPER);
    // @ts-ignore
    const ETHRegistrarController = await conflux.getContractAt('ETHRegistrarController', WEB3_CONTROLLER);
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
    receipt = await BaseRegistrarImplementation
        .addController(ETHRegistrarController.address)
        .sendTransaction({
            from: account
        })
        .executed();
    logReceipt(receipt, 'Add web3 controller to base registrar');

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
}

main().catch(console.log);

async function purchaseDomain(account: any) {
    // @ts-ignore
    const Web3Controller = await conflux.getContractAt('ETHRegistrarController', WEB3_CONTROLLER);
    // @ts-ignore
    const PublicResolver = await conflux.getContractAt('PublicResolver', PUBLIC_RESOLVER);

    const toBuy = 'jiuhua';
  
    const valid = await Web3Controller.valid(toBuy);
    console.log(`Is ${toBuy} valid`, valid);
  
    const available = await Web3Controller.available(toBuy);
    console.log(`Is ${toBuy} available`, available);
  
    const rentPrice = await Web3Controller.rentPrice(toBuy, ONE_YEAR);
    console.log(`Rent price of ${toBuy}`, new Drip(rentPrice[0]).toCFX(), 'CFX');
  
    const commitment = await Web3Controller
        .makeCommitment(toBuy, account.address, ONE_YEAR, labelhash(toBuy), PublicResolver.address, [], false, 0, ONE_YEAR);
  
    let receipt
    receipt = await Web3Controller
        .commit(commitment).sendTransaction({
            from: account
        })
        .executed();
    logReceipt(receipt, 'Commit');

    // TODO, need wait for two minutes
  
    receipt = await Web3Controller
        .register(toBuy, account.address, ONE_YEAR, labelhash(toBuy), PublicResolver.address, [], false, 0, ONE_YEAR)
        .sendTransaction({
            from: account.address,
            value: Drip.fromCFX(300),
        }).executed();
    logReceipt(receipt, 'Register');
  
  }
  
  async function claimReverseDomain(account: any) {
    // @ts-ignore
    const ENSRegistry = await conflux.getContractAt('ENSRegistry', ENS_REGISTRY);
    // @ts-ignore
    const ReverseRegistrar = await conflux.getContractAt('ReverseRegistrar', REVERSE_REGISTRAR);
    // @ts-ignore
    const PublicResolver = await conflux.getContractAt('PublicResolver', PUBLIC_RESOLVER);

    const toBuy = 'jiuhua';
  
    let receipt
    receipt = await ReverseRegistrar.claimForAddr(account.address, account.address, PublicResolver.address)
      .sendTransaction({
        from: account
      })
      .executed();
    logReceipt(receipt, 'Set default resolver for reverse registrar');
  
    const owner = await ENSRegistry.owner(namehash(`${format.hexAddress(account.address).replace('0x', '')}.addr.reverse`))
    console.log(owner)
  
    receipt = await PublicResolver.setName(namehash(`${format.hexAddress(account.address).replace('0x', '')}.addr.reverse`), 'jiuhua.web3')
      .sendTransaction({
        from: account
      })
      .executed();
    logReceipt(receipt, 'Set default resolver for reverse registrar');
  }
  
