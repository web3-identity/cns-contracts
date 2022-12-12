import hre from 'hardhat';
import { logReceipt } from '../utils';
const {
  conflux,    // The Conflux instance
} = hre;
import fs from 'fs';
import path from 'path';

async function main() {
  // @ts-ignore
  const [account] = await conflux.getSigners();
  // @ts-ignore
  const NameWhitelist = await conflux.getContractFactory('NameWhitelist');
  let receipt = await NameWhitelist.constructor().sendTransaction({
    from: account.address,
  }).executed();
  
  logReceipt(receipt, 'NameWhitelist');

  // @ts-ignore
  let nameWhitelist = await conflux.getContractAt('NameWhitelist', receipt.contractCreated);
  const emojis = await readEmojis();
  receipt = await nameWhitelist.setWhiteListBatch(emojis.join(''), true).sendTransaction({
    from: account.address
  }).executed();
  logReceipt(receipt, 'setWhiteList');
}

main().catch(console.log);

async function readEmojis() {
    // @ts-ignore
    const file = path.join(process.env.PROJECT_ROOT, '../charsets/data/char_set_emoji.txt');
    // @ts-ignore
    const emojis = fs.readFileSync(file, 'UTF-8').split('\n');
    return emojis;
}

