import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-conflux";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    cfxtest: {
      url: 'https://test.confluxrpc.com',
      accounts: [process.env.PRIVATE_KEY as string],
      chainId: 1,
    }
  }
};

export default config;
