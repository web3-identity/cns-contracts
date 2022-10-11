import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-conflux";
import 'solidity-docgen';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    cfxtest: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY as string],
      chainId: Number(process.env.NETWORK_ID as unknown as number),
    }
  }
};

export default config;
