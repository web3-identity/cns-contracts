import hre from 'hardhat';
import { logReceipt } from '../utils';
const {
  conflux,    // The Conflux instance
} = hre;
import fs from 'fs';
import path from 'path';

async function main() {
  // @ts-ignore
  const accounts = await conflux.getSigners();
  // @ts-ignore
  const CharWhitelist = await conflux.getContractFactory('CharWhitelist');
  let receipt = await CharWhitelist.constructor().sendTransaction({
    from: accounts[0].address,
  }).executed();
  
  logReceipt(receipt, 'CharWhitelist');

  let charWhitelist = await conflux.getContractAt('CharWhitelist', receipt.contractCreated);
  const emojis = await readEmojis();
  receipt = await charWhitelist.setWhiteListBatch(emojis.join(''), true).sendTransaction({
    from: accounts[0].address
  }).executed();
  logReceipt(receipt, 'setWhiteList');

  feedReservedNames(charWhitelist, accounts[0]);
}

main().catch(console.log);

async function readEmojis() {
    const file = path.join(process.env.PROJECT_ROOT, '../charsets/data/char_set_emoji.txt');
    const emojis = fs.readFileSync(file, 'UTF-8').split('\n');
    return emojis;
}

async function feedReservedNames(charWhitelist, account) {
    const file = path.join(process.env.PROJECT_ROOT, '../charsets/data/reserved_accounts.txt');
    const reserved = fs.readFileSync(file, 'UTF-8').split('\n');
    console.log('Reserved word length', reserved.length);
    const step = 1000
    for(let i = 0; i < reserved.length; i += step) {
        let receipt = await charWhitelist.setSpecialNameBatch(reserved.slice(i, i + step), true).sendTransaction({
            from: account.address
        }).executed();
        logReceipt(receipt, `Set Reserved Names ${i} - ${i + step}`);
    }
}