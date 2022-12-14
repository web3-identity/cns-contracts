import hre from 'hardhat';
import { format, Drip, Contract, address } from 'js-conflux-sdk'
import { StablePriceOracle__factory } from '../typechain-types';
import { 
    logReceipt, 
    ROOT_NODE, 
    labelhash, 
    namehash, 
    REVERSE_NAMEHASH,
    ONE_YEAR,
    waitNS,
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
    STABLE_ORACLE,
} = process.env;

async function main() {
    // @ts-ignore
    const [account] = await conflux.getSigners();
    
    // await purchaseDomain(account, 'heyman2');

    // await claimReverseDomain(account);

    // await resolve(account);

    // await registry();

    // await nameWrapper();

    // @ts-ignore
    const Web3Controller = await conflux.getContractAt('Web3RegistrarController', WEB3_CONTROLLER);

    /* await Web3Controller.setPriceOracle('cfxtest:acd51b7m6gufh1przxthzakrnm9w3g544ykhbt3pv5').sendTransaction({
        from: account.address
    }).executed(); */

    await Web3Controller.setCommitmentAge(10, 600).sendTransaction({
        from: account.address
    }).executed();

    
    /* await Web3Controller.setLabel45Quota(50000).sendTransaction({
        from: account.address,
    }).executed(); */

    
    // const status = await Web3Controller.labelStatus('1234');
    // console.log(status);

    /* const txs = await Web3Controller.setValidLen(4).sendTransaction({
        from: account.address,
    }).executed(); */

    // const status = await Web3Controller.valid('12');
    // console.log(status);

    // @ts-ignore
    // const StablePriceOracle = await conflux.getContractAt('contracts/web3registrar/StablePirceOracles.sol:StablePriceOracle', STABLE_ORACLE);

    /* // @ts-ignore
    let fiatpricesForOneYear = [10000n, 6100n, 3600n, 600n, 30n];  // cny
    for(let i = 0; i < fiatpricesForOneYear.length; i++) {
        fiatpricesForOneYear[i] = fiatpricesForOneYear[i] * BigInt(1e8) / (3600n * 24n * 365n);
        if (i === 4) fiatpricesForOneYear[i] = 0n;
    }
    console.log(fiatpricesForOneYear);
    const receipt2 = await StablePriceOracle.setFiatRentPrice(fiatpricesForOneYear).sendTransaction({
        from: account.address,
    }).executed();
    logReceipt(receipt2, 'StablePriceOracle setFiatPrice'); */

    // let p1 = await StablePriceOracle.fiatPrice5Letter();
    // console.log(p1);

    // const price = await Web3Controller.rentPriceInFiat('hi', ONE_YEAR);
    // console.log(price);
    
    // await setMetadataUrlService();
}

main().catch(console.log);

async function purchaseDomain(account: any, toBuy: string) {
    // @ts-ignore
    const Web3Controller = await conflux.getContractAt('Web3RegistrarController', WEB3_CONTROLLER);
    // @ts-ignore
    const PublicResolver = await conflux.getContractAt('PublicResolver', PUBLIC_RESOLVER);

    const valid = await Web3Controller.valid(toBuy);
    console.log(`Is ${toBuy} valid`, valid);
    const available = await Web3Controller.available(toBuy);
    console.log(`Is ${toBuy} available`, available);
    const rentPrice = await Web3Controller.rentPrice(toBuy, ONE_YEAR);
    console.log(`Rent price of ${toBuy}`, new Drip(rentPrice[0]).toCFX(), 'CFX');
    const labelStatus = await Web3Controller.labelStatus(toBuy);
    console.log(`Label status of ${toBuy}`, labelStatus);
    if (labelStatus !== 0n) {
        throw new Error('Label is not available');
    }
    
    const commitment = await Web3Controller
        .makeCommitment(toBuy, account.address, ONE_YEAR, labelhash(toBuy), PublicResolver.address, [], true, 0, ONE_YEAR);
    
    let receipt;
    receipt = await Web3Controller
        .commit(commitment).sendTransaction({
            from: account
        })
        .executed();
    logReceipt(receipt, 'Commit');
    
    /* receipt = await Web3Controller
        .commitWithName(commitment, labelhash(toBuy)).sendTransaction({
            from: account
        })
        .executed();
    logReceipt(receipt, 'CommitWithName'); */

    await waitNS(40);
  
    receipt = await Web3Controller
        // .registerWithFiat(toBuy, account.address, ONE_YEAR, labelhash(toBuy), PublicResolver.address, [], true, 0, ONE_YEAR)
        .register(toBuy, account.address, ONE_YEAR, labelhash(toBuy), PublicResolver.address, [], true, 0, ONE_YEAR)
        .sendTransaction({
            from: account.address,
            value: Drip.fromCFX(200),
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
    const name = 'heymancc.web3';
    const node = namehash(name);
    const owner = await ENSRegistry.owner(node);
    console.log('owner', owner);

    // @ts-ignore
    const PublicResolver = await conflux.getContractAt('PublicResolver', PUBLIC_RESOLVER);

    // set addr
    /* let tx = await PublicResolver.setAddr(node, account.address).sendTransaction({
        from: account
    }).executed(); */

    /* const { hexAddress: addressInBytes } = address.decodeCfxAddress(account.address);
    console.log('addressInBytes', addressInBytes);
    let tx = await PublicResolver.setAddr(node, 503, addressInBytes).sendTransaction({
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
    const [account] = await conflux.getSigners();
    // @ts-ignore
    const contract = await conflux.getContractAt('NameWrapper', NAME_WRAPPER);

    let name = 'heyman2.web3';
    let node = namehash(name);
    
    const owner = await contract.ownerOf(node);
    console.log(owner);

    const fuse = await contract.getData(node);
    console.log(fuse);
    
    // const domains = await contract.userDomains(account.address);
    // console.log(domains);

    let receipt = await contract.setFuses(node, 3).sendTransaction({
        from: account.address
    }).executed();
    console.log(receipt);
}

async function setWhitelist(account: any) {
    // @ts-ignore
    const Web3Controller = await conflux.getContractAt('Web3RegistrarController', WEB3_CONTROLLER);
    const receipt = await Web3Controller.setNameWhitelist('cfxtest:acekf9jn798v05m654gbbb6kj9ktxsxd2ypdsr3us9').sendTransaction({
        from: account
    }).executed();
    console.log(receipt);
}

async function setMetadataUrlService() {
    const uri = 'http://101.42.88.184/metadatas/{id}.json';
    // @ts-ignore
    const accounts = await conflux.getSigners();
    const account = accounts[0];
    
    // @ts-ignore
    const StaticMetadataService = await conflux.getContractFactory('StaticMetadataService');
    const receipt1 = await StaticMetadataService.constructor(uri).sendTransaction({
        from: account.address,
    }).executed();
    logReceipt(receipt1, 'StaticMetadataService');
    const staticMetadataServiceAddr = receipt1.contractCreated;

    // @ts-ignore
    const NameWrapper = await conflux.getContractAt('NameWrapper', NAME_WRAPPER);
    const receipt2 = await NameWrapper.setMetadataService(staticMetadataServiceAddr).sendTransaction({
        from: account.address,
    }).executed();
    logReceipt(receipt2, 'NameWrapper.setMetadataService');
}