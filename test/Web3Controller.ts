import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { deployCNS } from '../scripts/deployCNSInHardhat';

describe('Web3Controller', function() {

    async function deployENSContractsFixture() {
        return await deployCNS();
    }

    describe("Register", function () {
        it("Should set the right unlockTime", async function () {
          const { ethRegistrarController } = await loadFixture(deployENSContractsFixture);
        });
    });

});