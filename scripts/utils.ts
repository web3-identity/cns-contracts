import { TransactionReceipt } from "js-conflux-sdk/dist/types/rpc/types/formatter";
import fs from "fs";
import path from "path";
import { sign, format } from "js-conflux-sdk"
import uts46 from 'idna-uts46-hx'

export function logReceipt(receipt: TransactionReceipt, name?: string) {
  if (name) {
    console.log(`Receipt ${name} =============`);
  }
  console.log("Transaction hash:", receipt.transactionHash);
  if (receipt.outcomeStatus == 0) {
    if (receipt.contractCreated) {
      console.log("Contract created at:", receipt.contractCreated);
    }
  } else {
    // @ts-ignore
    console.log("Transaction failed:", receipt.txExecErrorMsg);
  }
}

export function getContractMetadata(contractName: string) {
  const contractMetadata = JSON.parse(
    fs.readFileSync(
      path.join(
        process.env.PROJECT_ROOT as string,
        `./artifacts/${contractName}.json`
      ),
      "utf8"
    )
  );
  return contractMetadata;
}

// web3
export const WEB3_NAMEHASH = '0x587d09fe5fa45354680537d38145a28b772971e0f293af3ee0c536fc919710fb'
// addr.reverse
export const REVERSE_NAMEHASH = '0x91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e2'

export const ETH_NAMEHASH = '0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae'

export const ROOT_NODE = format.hex(Buffer.alloc(32))

export const ONE_YEAR = 3600 * 24 * 365

export function labelhash (label: string) {
  const hash = sign.keccak256(Buffer.from(label))
  return format.hex(hash)
}

export function namehash (inputName: string) {
  // Reject empty names:
  const name = normalize(inputName)
  let node = Buffer.alloc(32);

  if (name) {
    let labels = name.split('.')

    for(let i = labels.length - 1; i >= 0; i--) {
      let labelSha = sign.keccak256(Buffer.from(labels[i]))
      node = sign.keccak256(Buffer.concat([node, labelSha], node.length + labelSha.length))
    }
  }

  return format.hex(node)
}

function normalize(name: string) {
  return name ? uts46.toUnicode(name, {useStd3ASCII: true}) : name
}

export async function waitNS(sec: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(null), sec * 1000);
    });
}

export function reverseName(address: string) {
    return `${format.hexAddress(address).replace('0x', '')}.addr.reverse`;
}

export function loadPrivateKey() {
  if (process.env.PRIVATE_KEY) {
    return process.env.PRIVATE_KEY;
  } else {
    // @ts-ignore
    const keystore = JSON.parse(fs.readFileSync(process.env.KEYSTORE, 'utf8'));
    // @ts-ignore
    const privateKeyBuf = sign.decrypt(keystore, process.env.KEYSTORE_PWD);
    return format.hex(privateKeyBuf);
  }
}

export function keccak(str: string) {
    const hash = sign.keccak256(Buffer.from(str))
    return '0x' + hash.toString('hex');
}