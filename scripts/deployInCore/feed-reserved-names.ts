import hre from 'hardhat';
import { logReceipt } from '../utils';
const {
    conflux,    // The Conflux instance
  } = hre;

async function main() {
    // @ts-ignore
    const [account] = await conflux.getSigners();
    // @ts-ignore
    let nameWhitelist = await conflux.getContractAt('NameWhitelist', receipt.contractCreated);
    await feedReservedNames(nameWhitelist, account);
}

main().catch(console.log);

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