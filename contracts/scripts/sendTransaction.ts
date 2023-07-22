const { ethers, network } = require("hardhat");
// const { create } = require("ipfs-http-client");

const CONTRACT_ADDRESS = "0xB4538EceA22A24e547563963AcD711f6cC2a7642";

async function getContract(signerIndex: number = 0) {
  console.log("Preparing signer")
  const signers = await ethers.getSigners();
  const signer = signers[signerIndex];
  console.log(`Selected signer ${signer}`);

  console.log("Preparing transaction");
  const HumaneAIDataset = await ethers.getContractFactory("HumaneAIDataset");
  const humaneAIDataset = await HumaneAIDataset.attach(CONTRACT_ADDRESS);
  const humaneAIDatasetWithSigner = humaneAIDataset.connect(signer);

  return humaneAIDatasetWithSigner;
}

async function joinAsCreator(signerIndex: number = 0) {
    const humaneAIDatasetWithSigner = await getContract(signerIndex);
    
    console.log("Sending transaction");
    const options = {value: ethers.parseEther("0.1")}
    const txObj = await humaneAIDatasetWithSigner.joinAsCreator(options);
    console.log(`Sent transaction ${txObj.hash}`);

    console.log("Waiting for transaction confirmation...")
    await txObj.wait();
    console.log("Transaction confirmed.")
    console.log("DONE!");
}

async function main() {
  await joinAsCreator(0);
}



main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });