import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import {createDataSetItem, joinAsCreator, joinAsVerifier, voteDataSetItem } from "./scripts/actions";

//https://hardhat.org/hardhat-runner/docs/config#json-rpc-based-networks

let accounts = ["17ee17a024700674cbadadcc198ba538c2b33974b5bf95eb0f11a47151eaf2eb"]

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {
    },
    gnosis: {
      url: "https://rpc.gnosischain.com",
      accounts: accounts,
    },
    chiado: {
      url: "https://rpc.chiadochain.net",
      gasPrice: 1000000000,
      accounts: accounts,
    },
    mumbai: {
      url: "https://polygon-testnet-rpc.allthatnode.com:8545",
      gasPrice: 20000000000,
      accounts: accounts,
    }
  }
};

task("joinAsCreator", "Task to join as creator")
  .addPositionalParam("signerIndex")
  .setAction(async (taskArgs) => {
    console.log("Running task joinAsCreator");
    await joinAsCreator(taskArgs.signerIndex);
  });

task("joinAsVerifier", "Task to join as creator")
  .addPositionalParam("signerIndex")
  .setAction(async (taskArgs, hre) => {
    console.log("Running task joinAsVerifier");
    await joinAsVerifier(hre, parseInt(taskArgs.signerIndex, 10));
  });

task("createDataSetItem", "Creates data set item")
  .addPositionalParam("signerIndex")
  .addPositionalParam("format")
  .addPositionalParam("tags")
  .addPositionalParam("content")
  .setAction(async (taskArgs, hre) => {
    console.log("Running task createDataSetItem");
    await createDataSetItem(
      hre,
      parseInt(taskArgs.format, 10),
      taskArgs.tags.split(",").map((numStr: string) => parseInt(numStr.trim(), 10)),
      taskArgs.content,
      parseInt(taskArgs.signerIndex, 10)
    );
  });
  
  
task("voteDataSetItem", "votes for data set item")
  .addPositionalParam("signerIndex")
  .addPositionalParam("id")
  .addPositionalParam("vote")
  .setAction(async (taskArgs, hre) => {
    console.log("Running task voteDataSetItem");
    await voteDataSetItem(
      hre,
      parseInt(taskArgs.id, 10),
      parseInt(taskArgs.vote, 10),
      parseInt(taskArgs.signerIndex, 10)
    );
  });

export default config;