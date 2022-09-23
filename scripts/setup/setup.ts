import { format, Drip } from 'js-conflux-sdk'
import { 
  namehash, 
  labelhash, 
  WEB3_NAMEHASH, 
  REVERSE_NAMEHASH, 
  ROOT_NODE
} from '../sdk/utils'
import { 
  account, 
  Registry, 
  BaseRegistrar,
  ReverseRegistrar,
  Web3Controller,
  PublicResolver,
  NameWrapper,
} from './index'
import {
  logReceipt
} from '../utils'

async function main() {
  const owner = await Registry.owner(ROOT_NODE);
  console.log('Root node owner', owner);

  // await basicSetup();

  // await purchaseDomain();

  await claimReverseDomain();
}

main().catch(console.log)

async function basicSetup() {
  let receipt;

  /* receipt = await Registry.setSubnodeOwner(ROOT_NODE, labelhash('web3'), BaseRegistrar.address)
    .sendTransaction({
      from: account.address,
    })
    .executed();
  logReceipt(receipt, 'Set web3 owner to base registrar');

  await setOwnerOfAddrReverse();

  receipt = await BaseRegistrar.addController(Web3Controller.address)
    .sendTransaction({
      from: account
    })
    .executed();
  logReceipt(receipt, 'Add web3 controller to base registrar');

  receipt = await BaseRegistrar.addController(NameWrapper.address)
    .sendTransaction({
      from: account
    })
    .executed();
  logReceipt(receipt, 'Add name wrapper to base registrar'); */

  /* receipt = await NameWrapper.setController(Web3Controller.address, true)
    .sendTransaction({
      from: account
    })
    .executed();
  logReceipt(receipt, 'Add web3 controller to name wrapper'); */

  /* receipt = await ReverseRegistrar.setDefaultResolver(PublicResolver.address)
    .sendTransaction({
      from: account
    })
    .executed();
  logReceipt(receipt, 'Set default resolver for reverse registrar'); */
}

async function setOwnerOfAddrReverse() {
  let receipt
  // addr.reverse
  receipt = await Registry.setSubnodeOwner(ROOT_NODE, labelhash('reverse'), account.address)
    .sendTransaction({
      from: account
    })
    .executed();
  logReceipt(receipt, 'Set reverse owner to reverse registrar');

  receipt = await Registry.setSubnodeOwner(namehash('reverse'), labelhash('addr'), ReverseRegistrar.address)
    .sendTransaction({
      from: account
    })
    .executed();
  logReceipt(receipt, 'Set reverse owner to reverse registrar');

  const ownerOfReverse = await Registry.owner(REVERSE_NAMEHASH);
  console.log('addr.reverse node owner', ownerOfReverse);
}

async function purchaseDomain() {
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
  /* receipt = await Web3Controller.commit(commitment).sendTransaction({
    from: account
  })
  .executed();
  logReceipt(receipt, 'Commit'); */

  receipt = await Web3Controller
    .register(toBuy, account.address, ONE_YEAR, labelhash(toBuy), PublicResolver.address, [], false, 0, ONE_YEAR)
    .sendTransaction({
      from: account.address,
      value: Drip.fromCFX(300),
    }).executed();
  logReceipt(receipt, 'Register');

}

async function claimReverseDomain() {
  const toBuy = 'jiuhua';

  let receipt
  /* receipt = await ReverseRegistrar.claimForAddr(account.address, account.address, PublicResolver.address)
    .sendTransaction({
      from: account
    })
    .executed();
  logReceipt(receipt, 'Set default resolver for reverse registrar'); */

  /* const owner = await Registry.owner(namehash(`${format.hexAddress(account.address).replace('0x', '')}.addr.reverse`))
  console.log(owner) */

  receipt = await PublicResolver.setName(namehash(`${format.hexAddress(account.address).replace('0x', '')}.addr.reverse`), 'jiuhua.web3')
    .sendTransaction({
      from: account
    })
    .executed();
  logReceipt(receipt, 'Set default resolver for reverse registrar');

}
