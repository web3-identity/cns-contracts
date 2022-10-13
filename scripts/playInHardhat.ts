import { ethers } from "hardhat";
import { labelhash, ONE_YEAR } from './utils'
import { mine } from "@nomicfoundation/hardhat-network-helpers";
import { deployCNS } from './deployCNSInHardhat';

async function main() {
  const signers = await ethers.getSigners();
  const account = signers[0];
  const adminAddr = account.address;
  console.log(`The default signer`, adminAddr);
  const {
    ethRegistrarController,
    publicResolver,
  } = await deployCNS();

  // test buy a name ==================================
  let tx;
  const toBuy = 'jiuhua';
  const valid = await ethRegistrarController.valid(toBuy);
  console.log(`valid: ${valid}`);

  const available = await ethRegistrarController.available(toBuy);
  console.log(`available: ${available}`);

  const price = await ethRegistrarController.rentPrice(toBuy, ONE_YEAR);
  console.log(`price: ${price[0]}`);

  const commitment = await ethRegistrarController.makeCommitment(toBuy, adminAddr, ONE_YEAR, labelhash(toBuy), publicResolver.address, [], true, 0, ONE_YEAR);
  
  tx = await ethRegistrarController.commit(commitment);
  await tx.wait();

  await mine(30);
  
  tx = await ethRegistrarController.register(toBuy, adminAddr, ONE_YEAR, labelhash(toBuy), publicResolver.address, [], true, 0, ONE_YEAR, {
    value: price[0]
  });
  await tx.wait();

  // fiat registration
  for(let i = 0; i < 10; i++) {
    const _toBuy = `jiuhua${i}`;
    const secret = labelhash(_toBuy);
    const commitment = await ethRegistrarController.makeCommitment(_toBuy, adminAddr, ONE_YEAR, secret, publicResolver.address, [], true, 0, ONE_YEAR);
  
    tx = await ethRegistrarController.commitWithName(commitment, labelhash(_toBuy));
    await tx.wait();

    await mine(30);
    
    tx = await ethRegistrarController.registerWithFiat(_toBuy, adminAddr, ONE_YEAR, secret, publicResolver.address, [], true, 0, ONE_YEAR);
    await tx.wait();
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
