import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { HumaneAIDataset } from '../typechain-types/HumaneAIDataset';

describe("HumaneAIDataset", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {
    const HumaneAIDataset = await ethers.getContractFactory("HumaneAIDataset");
    const humaneAIDataset = await HumaneAIDataset.deploy();
    return humaneAIDataset;
  }

  describe("Deployment", function () {
    it("Should deploy", async function () {
      await loadFixture(deploy);
    });
  });
});
