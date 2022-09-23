import { ethers } from "ethers";
import { getContractMetadata } from "./utils";

const name = 'contracts/wrapper/NameWrapper.sol/NameWrapper';
const { abi } = getContractMetadata(name);
const iface = new ethers.utils.Interface(abi);
console.log(iface.format(ethers.utils.FormatTypes.full))
