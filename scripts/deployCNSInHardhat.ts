import { ethers } from "hardhat";
import { WEB3_NAMEHASH, ROOT_NODE, namehash, labelhash } from './utils'

export async function deployCNS() {
  const [admin] = await ethers.getSigners();
  const adminAddr = admin.address;
//   console.log(`The default signer`, adminAddr);

  // deploy contracts ===========================
  // deploy ENSRegistry  
  const ENSRegistry = await ethers.getContractFactory("ENSRegistry");
  const ensRegistry = await ENSRegistry.deploy();
  await ensRegistry.deployed();
//   console.log(`ENSRegistry deployed to ${ensRegistry.address}`);

  // deploy ReverseRegistrar
  const ReverseRegistrar = await ethers.getContractFactory("ReverseRegistrar");
  const reverseRegistrar = await ReverseRegistrar.deploy(ensRegistry.address);
  await reverseRegistrar.deployed();
//   console.log(`ReverseRegistrar deployed to ${reverseRegistrar.address}`);

  const BaseRegistrarImplementation = await ethers.getContractFactory("BaseRegistrarImplementation");
  const baseRegistrarImplementation = await BaseRegistrarImplementation.deploy(ensRegistry.address, WEB3_NAMEHASH);
  await baseRegistrarImplementation.deployed();
//   console.log(`BaseRegistrarImplementation deployed to ${baseRegistrarImplementation.address}`);

  const StaticMetadataService = await ethers.getContractFactory("StaticMetadataService");
  const staticMetadataService = await StaticMetadataService.deploy('http://a.xyz/{id}.json');
  await staticMetadataService.deployed();
//   console.log(`StaticMetadataService deployed to ${staticMetadataService.address}`);

  const NameWrapper = await ethers.getContractFactory("NameWrapper");
  const nameWrapper = await NameWrapper.deploy(ensRegistry.address, baseRegistrarImplementation.address, staticMetadataService.address);
  await nameWrapper.deployed();
//   console.log(`NameWrapper deployed to ${nameWrapper.address}`);

  const cfxPrice = BigInt(1 * 1e8);
  const CFXPriceOracle = await ethers.getContractFactory("CFXPriceOracle");
  const cfxPriceOracle = await CFXPriceOracle.deploy(cfxPrice);
  await cfxPriceOracle.deployed();
//   console.log(`CFXPriceOracle deployed to ${cfxPriceOracle.address}`);

  let pricesForOneYear = [100000n, 10000n, 1000n, 100n, 10n, 1n];  // usd
  for(let i = 0; i < pricesForOneYear.length; i++) {
    pricesForOneYear[i] = pricesForOneYear[i] * BigInt(1e18) / (3600n * 24n * 365n);
  }
  const StablePriceOracle = await ethers.getContractFactory("contracts/web3registrar/StablePirceOracles.sol:StablePriceOracle");
  const stablePriceOracle = await StablePriceOracle.deploy(cfxPriceOracle.address, pricesForOneYear);
  await stablePriceOracle.deployed();
//   console.log(`StablePriceOracle deployed to ${stablePriceOracle.address}`);

  // set fiat purchase price
  let fiatpricesForOneYear = [100000n, 10000n, 6100n, 3600n, 600n, 30n];  // cny
  for(let i = 0; i < fiatpricesForOneYear.length; i++) {
    fiatpricesForOneYear[i] = fiatpricesForOneYear[i] * BigInt(1e18) / (3600n * 24n * 365n);
  }
  const _tx = await stablePriceOracle.setFiatRentPrice(fiatpricesForOneYear);
  await _tx.wait();

  const minCommitmentAge = 30 // s
  const maxCommitmentAge = 600; // s
  const ControllerContractFullName = "contracts/web3registrar/Web3RegistrarController.sol:ETHRegistrarController";
  const ETHRegistrarController = await ethers.getContractFactory(ControllerContractFullName);
  let ethRegistrarController = await ETHRegistrarController.deploy(baseRegistrarImplementation.address, stablePriceOracle.address, minCommitmentAge, maxCommitmentAge, reverseRegistrar.address, nameWrapper.address);
  await ethRegistrarController.deployed();
//   console.log(`ETHRegistrarController deployed to ${ethRegistrarController.address}`);

  // deploy ethController proxy
  const controllerInitData = ethRegistrarController.interface.encodeFunctionData('initialize', [
    baseRegistrarImplementation.address,
    stablePriceOracle.address,
    minCommitmentAge,
    maxCommitmentAge,
    reverseRegistrar.address,
    nameWrapper.address,
    admin.address,
  ]);
  const Proxy1967 = await ethers.getContractFactory("Proxy1967");
  const proxy1967 = await Proxy1967.deploy(ethRegistrarController.address, controllerInitData);
  await proxy1967.deployed();
  ethRegistrarController = await ethers.getContractAt(ControllerContractFullName, proxy1967.address);


  const NameWhitelist = await ethers.getContractFactory("NameWhitelist");
  const nameWhitelist = await NameWhitelist.deploy();
  await nameWhitelist.deployed();

  const PublicResolver = await ethers.getContractFactory("PublicResolver");
  const publicResolver = await PublicResolver.deploy(ensRegistry.address, nameWrapper.address, ethRegistrarController.address, reverseRegistrar.address);
  await publicResolver.deployed();
//   console.log(`PublicResolver deployed to ${publicResolver.address}`);

  // setup contracts ===========================
  let tx;
  tx = await ensRegistry.setSubnodeOwner(ROOT_NODE, labelhash('web3'), baseRegistrarImplementation.address)
  await tx.wait();

  tx = await ensRegistry.setSubnodeOwner(ROOT_NODE, labelhash('reverse'), admin.address)
  await tx.wait();

  tx = await ensRegistry.setSubnodeOwner(namehash('reverse'), labelhash('addr'), reverseRegistrar.address)
  await tx.wait();

//   tx = await baseRegistrarImplementation.addController(ethRegistrarController.address);
//   await tx.wait();

  tx = await baseRegistrarImplementation.addController(nameWrapper.address);
  await tx.wait();

  tx = await nameWrapper.setController(ethRegistrarController.address, true);
  await tx.wait();

  tx = await reverseRegistrar.setDefaultResolver(publicResolver.address);
  await tx.wait();

  tx = await reverseRegistrar.setController(ethRegistrarController.address, true);
  await tx.wait();

  tx = await ethRegistrarController.setNameWhitelist(nameWhitelist.address);
  await tx.wait();

  return {
    ensRegistry,
    reverseRegistrar,
    baseRegistrarImplementation,
    staticMetadataService,
    nameWrapper,
    cfxPriceOracle,
    stablePriceOracle,
    ethRegistrarController,
    nameWhitelist,
    publicResolver,
  };
}