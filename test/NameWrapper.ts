import { time, loadFixture, mine } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers, ConfluxSDK } from "hardhat";
import { deployCNS } from '../scripts/deployCNSInHardhat';
import { namehash, labelhash, ONE_YEAR} from '../scripts/utils';

describe('NameWrapper', function() {

    async function deployENSContractsFixture() {
        return await deployCNS();
    }

    describe("TokenCount", function () {
        it("tokenCount and label45Count should be right", async function () {
            const { ethRegistrarController, publicResolver, nameWrapper } = await loadFixture(deployENSContractsFixture);
            const [owner] = await ethers.getSigners();
            
            const labelName = 'test';
            const label = labelhash(labelName);
            const commitment = await ethRegistrarController.makeCommitment(labelName, owner.address, ONE_YEAR, label, publicResolver.address, [], true, 0, 0);
            let tx = await ethRegistrarController.commitWithName(commitment, label);
            await tx.wait();
            await mine(30);
            tx = await ethRegistrarController.registerWithFiat(labelName, owner.address, ONE_YEAR, label, publicResolver.address, [], true, 0, 0);
            await tx.wait();

            const tokenCount = await nameWrapper.tokenCount();
            expect(tokenCount).to.equal(1);
            const label45Count = await nameWrapper.label45Count();
            expect(label45Count).to.equal(1);
        });
    });

});