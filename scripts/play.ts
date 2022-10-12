import hre from 'hardhat';
import { format, Drip, Contract } from 'js-conflux-sdk'
import { 
    logReceipt, 
    ROOT_NODE, 
    labelhash, 
    namehash, 
    REVERSE_NAMEHASH,
    ONE_YEAR,
} from './utils';
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
    
    // await purchaseDomain(account);

    // await claimReverseDomain(account);

    await resolve(account);

    await registry();

    await nameWrapper();
}

main().catch(console.log);

async function purchaseDomain(account: any) {
    // @ts-ignore
    const Web3Controller = await conflux.getContractAt('ETHRegistrarController', WEB3_CONTROLLER);
    // @ts-ignore
    const PublicResolver = await conflux.getContractAt('PublicResolver', PUBLIC_RESOLVER);

    const toBuy = 'jiuhua1';

    let receipt
  
    /* const valid = await Web3Controller.valid(toBuy);
    console.log(`Is ${toBuy} valid`, valid);
  
    const available = await Web3Controller.available(toBuy);
    console.log(`Is ${toBuy} available`, available);
  
    const rentPrice = await Web3Controller.rentPrice(toBuy, ONE_YEAR);
    console.log(`Rent price of ${toBuy}`, new Drip(rentPrice[0]).toCFX(), 'CFX');
  
    const commitment = await Web3Controller
        .makeCommitment(toBuy, account.address, ONE_YEAR, labelhash(toBuy), PublicResolver.address, [], true, 0, ONE_YEAR);
  
    
    receipt = await Web3Controller
        .commit(commitment).sendTransaction({
            from: account
        })
        .executed();
    logReceipt(receipt, 'Commit'); */

    // TODO, need wait for two minutes
  
    receipt = await Web3Controller
        .register(toBuy, account.address, ONE_YEAR, labelhash(toBuy), PublicResolver.address, [], true, 0, ONE_YEAR)
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

async function resolve(account: any) {
    // @ts-ignore
    const ENSRegistry = await conflux.getContractAt('ENSRegistry', ENS_REGISTRY);
    const name = 'jiuhua1.web3';
    const node = namehash(name);
    const owner = await ENSRegistry.owner(node);
    console.log('owner', owner);

    // @ts-ignore
    const PublicResolver = await conflux.getContractAt('PublicResolver', PUBLIC_RESOLVER);

    // set addr
    /* let tx = await PublicResolver.setAddr(node, account.address).sendTransaction({
        from: account
    }).executed(); */

    const addr = await PublicResolver.addr(node);
    console.log('addr', addr);
    
}

async function registry() {
    // @ts-ignore
    const ENSRegistry = await conflux.getContractAt('ENSRegistry', ENS_REGISTRY);

    const name = 'jiuhua1.web3';

    const node = namehash(name);

    const owner = await ENSRegistry.owner(node);
    console.log(owner);


}

async function nameWrapper() {
    // @ts-ignore
    const contract = await conflux.getContractAt('NameWrapper', NAME_WRAPPER);

    let name = 'abcde3.web3';

    name = 'jiuhua1.web3'

    let node = namehash(name);
    
    // console.log(node.length);
    // node = '0x67671454625844516493684665783378455488205828396291306152939852180311092108837';
    // console.log(node.length);

    const owner = await contract.ownerOf(node);
    console.log(owner);


}