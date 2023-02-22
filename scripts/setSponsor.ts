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
        'cfxtest:acd3rm7y183trhpzvz8m3y72kx1abk4d0jh842585a',
        'cfxtest:acfmezysbf86jy3jnw835bnamxp08dxzd61w5ur8hy',
        'cfxtest:acbp262fvjzva1raef4n3e5yyszy9spsc20cmztnya',  
        'cfxtest:acbttry22rsx7k54ms6hbkc0c8tf680u5pc0r31ef5',
        'cfxtest:acde0h4f9nz70h146d4p0wbbx38zamwhue3uce1ndt',
        'cfxtest:acfcb2fv6t8xrxyyx3x1atwmdrhh5xvfd21zsje216'
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
        value: Drip.fromCFX(11),
    }).executed();
    logReceipt(receipt, 'setSponsorForGas');

    receipt = await Sponsor.setSponsorForCollateral(addr).sendTransaction({
        from: account.address,
        value: Drip.fromCFX(201),
    }).executed();
    logReceipt(receipt, 'setSponsorForCollateral');

}