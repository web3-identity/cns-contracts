import hre from 'hardhat';
import { format, Drip, Contract, address, CONST } from 'js-conflux-sdk'
import { 
    logReceipt, 
} from './utils';

const {
    conflux,    // The Conflux instance
} = hre;

async function main() {
    let addrs = [
        'cfxtest:acc1ttg7287cybsdy6bn0002nzepypn29yavjbj36g',
        'cfxtest:acdc4xzy0pg1dzrbajgmv8nw3cjyj6ezn2dzncc4w5',
        'cfxtest:acbrnwph2609zbf21np0501d87xb9dnvuakpv911xk',  
        'cfxtest:acecxexm0pg268m44jncw5bmagwwmun53jj9msmadj',
    ];

    for (let addr of addrs) {
        await setSponsor(addr);
    }

    console.log('Finished');
}

main().catch(console.log);

async function setSponsor(addr: string) {
    // @ts-ignore
    const [account] = await conflux.getSigners();

    const Sponsor = conflux.InternalContract('SponsorWhitelistControl');

    let receipt;

    receipt = await Sponsor.addPrivilegeByAdmin(addr, [CONST.ZERO_ADDRESS_HEX]).sendTransaction({
        from: account.address,
    }).executed();

    logReceipt(receipt, 'addPrivilegeByAdmin');

    receipt = await Sponsor.setSponsorForGas(addr, Drip.fromGDrip(5000000)).sendTransaction({
        from: account.address,
        value: Drip.fromCFX(10),
    }).executed();
    logReceipt(receipt, 'setSponsorForGas');

    receipt = await Sponsor.setSponsorForCollateral(addr).sendTransaction({
        from: account.address,
        value: Drip.fromCFX(200),
    }).executed();
    logReceipt(receipt, 'setSponsorForCollateral');

}