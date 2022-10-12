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
  const account = accounts[0];
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

  await feedReservedNames(nameWhitelist, account);
}

main().catch(console.log);

async function readEmojis() {
    // @ts-ignore
    const file = path.join(process.env.PROJECT_ROOT, '../charsets/data/char_set_emoji.txt');
    // @ts-ignore
    const emojis = fs.readFileSync(file, 'UTF-8').split('\n');
    return emojis;
}

async function feedReservedNames(nameWhitelist: any, account: any) {
    // @ts-ignore
    const file = path.join(process.env.PROJECT_ROOT, '../charsets/data/reserved_accounts.txt');
    // @ts-ignore
    const reserved = fs.readFileSync(file, "UTF-8").split('\n');
    console.log('Reserved word length', reserved.length);
    const step = 1000
    for(let i = 0; i < reserved.length; i += step) {
        let receipt = await nameWhitelist.setSpecialNameBatch(reserved.slice(i, i + step), true).sendTransaction({
            from: account.address
        }).executed();
        logReceipt(receipt, `Set Reserved Names ${i} - ${i + step}`);
    }
}