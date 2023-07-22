import ipfsCLient from 'ipfs-http-client';

import { HardhatRuntimeEnvironment } from "hardhat/types";

const CONTRACT_ADDRESS = "0xB4538EceA22A24e547563963AcD711f6cC2a7642";

async function getContract(hre: HardhatRuntimeEnvironment, signerIndex: number = 0): Promise<any> {
  console.log("Preparing signer")
  const signers = await hre.ethers.getSigners();
  const signer = signers[signerIndex];
  console.log(`Selected signer ${signer.address}`);

  console.log("Preparing transaction");
  const HumaneAIDataset = await hre.ethers.getContractFactory("HumaneAIDataset");
  const humaneAIDataset = await HumaneAIDataset.attach(CONTRACT_ADDRESS);
  const humaneAIDatasetWithSigner = humaneAIDataset.connect(signer);

  return humaneAIDatasetWithSigner;
}

export async function joinAsCreator(hre: HardhatRuntimeEnvironment, signerIndex: number = 0) {
    const humaneAIDatasetWithSigner = await getContract(hre, signerIndex);
    
    console.log("Sending transaction");
    const options = {value: hre.ethers.parseEther("0.001")}
    const txObj = await humaneAIDatasetWithSigner.joinAsCreator(options);
    console.log(`Sent transaction ${txObj.hash}`);

    console.log("Waiting for transaction confirmation...")
    await txObj.wait();
    console.log("Transaction confirmed.")
    console.log("DONE!");
}

export async function joinAsVerifier(hre: HardhatRuntimeEnvironment, signerIndex: number = 0) {
  const humaneAIDatasetWithSigner = await getContract(hre, signerIndex);
  
  console.log("Sending transaction");
  const options = {value: hre.ethers.parseEther("0.001")}
  const txObj = await humaneAIDatasetWithSigner.joinAsVerifier(options);
  console.log(`Sent transaction ${txObj.hash}`);

  console.log("Waiting for transaction confirmation...")
  await txObj.wait();
  console.log("Transaction confirmed.")
  console.log("DONE!");
}

export async function createDataSetItem(hre: HardhatRuntimeEnvironment, format: number, tags: number[], content: string, signerIndex: number = 0) {
  const humaneAIDatasetWithSigner = await getContract(hre, signerIndex);

  console.log(`Format is ${format}`);
  console.log(`Tags are ${tags}`);

  console.log("Uploading content to IPFS");
  const api = ipfsCLient.create({
    url: "https://api.thegraph.com/ipfs/api/v0"
  });

  const buf = Buffer.from(content, "utf-8");
  const { cid } = await api.add(content);
  console.log(`IPFS hash is ${cid}`);

  console.log("Sending transaction");
  const txObj = await humaneAIDatasetWithSigner.createDataSetItem(format, tags, cid.toString());
  console.log(`Sent transaction ${txObj.hash}`);

  console.log("Waiting for transaction confirmation...")
  await txObj.wait();
  console.log("Transaction confirmed.")
  console.log("DONE!");
}

export async function voteDataSetItem(hre: HardhatRuntimeEnvironment, id: number, vote: number, signerIndex: number = 0) {
  const humaneAIDatasetWithSigner = await getContract(hre, signerIndex);
  
  console.log("Sending transaction");
  const txObj = await humaneAIDatasetWithSigner.voteDataSetItem(id, vote);
  console.log(`Sent transaction ${txObj.hash}`);

  console.log("Waiting for transaction confirmation...")
  await txObj.wait();
  console.log("Transaction confirmed.")
  console.log("DONE!");
}