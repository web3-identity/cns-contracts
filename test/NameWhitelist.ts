import { ethers } from "hardhat";
import fs from 'fs';
import path from 'path';
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";

// @ts-ignore
const RESERVED_SETS_FILE = path.join(process.env.PROJECT_ROOT, '../charsets/data/reserved_accounts.txt');

async function readEmojis() {
    // @ts-ignore
    const file = path.join(process.env.PROJECT_ROOT, '../charsets/data/char_set_emoji.txt');
    // @ts-ignore
    const emojis = fs.readFileSync(file, 'UTF-8').split('\n');
    return emojis;
}

describe("NameWhitelist", function() {
    
    async function deployNameWhitelist() {
        const NameWhitelist = await ethers.getContractFactory("NameWhitelist");
        const nameWhitelist = await NameWhitelist.deploy();

        // @ts-ignore
        /* const reserved = fs.readFileSync(RESERVED_SETS_FILE, "UTF-8").split('\n');
        console.log('Reserved word length', reserved.length);
        const step = 500;
        for(let i = 0; i < reserved.length; i += step) {
            let tx = await nameWhitelist.setSpecialNameBatch(reserved.slice(i, i + step), true);
            await tx.wait();
        } */

        /* const emojis = await readEmojis();
        let tx1 = await nameWhitelist.setWhiteListBatch(emojis.join(''), true);
        await tx1.wait(); */

        return { nameWhitelist };
    }

    describe("isLabelValid", function() {

        it('should valid', async function() {
            const { nameWhitelist } = await loadFixture(deployNameWhitelist);
            expect(await nameWhitelist.isLabelValid('hello')).to.equal(true);
            expect(await nameWhitelist.isLabelValid('')).to.equal(true);
            expect(await nameWhitelist.isLabelValid('-')).to.equal(true);
            expect(await nameWhitelist.isLabelValid('1')).to.equal(true);
            expect(await nameWhitelist.isLabelValid('hello123')).to.equal(true);
            expect(await nameWhitelist.isLabelValid('123hello')).to.equal(true);
            expect(await nameWhitelist.isLabelValid('hel123lo')).to.equal(true);
        });

        it('invalid characters', async function() {
            const { nameWhitelist } = await loadFixture(deployNameWhitelist);
            expect(await nameWhitelist.isLabelValid('H')).to.equal(false);
            expect(await nameWhitelist.isLabelValid('#')).to.equal(false);
            expect(await nameWhitelist.isLabelValid('.')).to.equal(false);
            expect(await nameWhitelist.isLabelValid('!')).to.equal(false);
            expect(await nameWhitelist.isLabelValid('@')).to.equal(false);
            expect(await nameWhitelist.isLabelValid('$')).to.equal(false);
            expect(await nameWhitelist.isLabelValid('%')).to.equal(false);
            expect(await nameWhitelist.isLabelValid('_')).to.equal(false);
        });

        it('common invalid case', async function() {
            const { nameWhitelist } = await loadFixture(deployNameWhitelist);
            expect(await nameWhitelist.isLabelValid('123..')).to.equal(false);
            expect(await nameWhitelist.isLabelValid('..123')).to.equal(false);

            expect(await nameWhitelist.isLabelValid('123Abc')).to.equal(false);
            expect(await nameWhitelist.isLabelValid('123Abcc')).to.equal(false);
            expect(await nameWhitelist.isLabelValid('123##')).to.equal(false);
        });
    });
});