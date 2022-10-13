import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers, ConfluxSDK } from "hardhat";
import { deployCNS } from '../scripts/deployCNSInHardhat';
import { namehash, labelhash, ONE_YEAR} from '../scripts/utils';

describe('Web3Controller', function() {

    async function deployENSContractsFixture() {
        return await deployCNS();
    }

    describe("Label Lock", function () {
        it("commitWithName should lock name", async function () {
            const { ethRegistrarController, publicResolver } = await loadFixture(deployENSContractsFixture);
            const [owner] = await ethers.getSigners();
            const labelName = 'test';
            const label = labelhash(labelName);
            const commitment = await ethRegistrarController.makeCommitment(labelName, owner.address, ONE_YEAR, label, publicResolver.address, [], true, 0, 0);
            let tx = await ethRegistrarController.commitWithName(commitment, label);
            await tx.wait();

            const status = await ethRegistrarController.labelStatus(labelName);
            expect(status).to.equal(4); // locked
        });
    });

});