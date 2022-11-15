import hre from 'hardhat';
import { logReceipt, namehash, labelhash, ROOT_NODE } from '../utils';
const {
  conflux,    // The Conflux instance
} = hre;

const { ENS_REGISTRY } = process.env;

async function main() {
  // @ts-ignore
  const [account,] = await conflux.getSigners();
  const TEST_LABEL = 'test';
  // @ts-ignore
  /* const TestRegistrar = await conflux.getContractFactory('TestRegistrar');
  const receipt = await TestRegistrar.constructor(ENS_REGISTRY, namehash('test')).sendTransaction({
    from: account.address,
  }).executed();
  
  logReceipt(receipt, 'TestRegistrar'); */

  // @ts-ignore
  const FIFSRegistrar = await conflux.getContractFactory('FIFSRegistrar');
  const receipt2 = await FIFSRegistrar.constructor(ENS_REGISTRY, namehash(TEST_LABEL)).sendTransaction({
    from: account.address,
  }).executed();
  
  logReceipt(receipt2, 'FIFSRegistrar');

  // @ts-ignore
  const ENSRegistry = await conflux.getContractAt('ENSRegistry', ENS_REGISTRY);

  // setup .web3
  let receipt = await ENSRegistry
  .setSubnodeOwner(ROOT_NODE, labelhash(TEST_LABEL), receipt2.contractCreated)
  .sendTransaction({
      from: account.address,
  })
  .executed();
logReceipt(receipt, 'Set "test" owner to FIFSRegistrar');
}

main().catch(console.log);