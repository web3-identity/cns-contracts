import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-conflux";
import 'hardhat-abi-exporter'
import 'solidity-docgen';
import { loadPrivateKey } from './scripts/utils';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const PRIVATE_KEY = loadPrivateKey();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    cfxtest: {
      url: process.env.RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: Number(process.env.NETWORK_ID as unknown as number),
    }
  },
  abiExporter: {
    path: './build/contracts',
    runOnCompile: true,
    clear: true,
    flat: true,
    except: [
        'AggregatorInterface',
        'StablePriceOracle',
        'Controllable$',
        'INameWrapper$',
        'NameResolver$',
    ],
    spacing: 2,
    pretty: true,
  }
};

export default config;
