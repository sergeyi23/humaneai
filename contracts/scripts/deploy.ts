import { ethers } from "hardhat";

async function main() {
  const humaneAIDataset = await ethers.deployContract("HumaneAIDataset");

  await humaneAIDataset.waitForDeployment();

  console.log(`HumaneAIDataset deployed to ${humaneAIDataset.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
