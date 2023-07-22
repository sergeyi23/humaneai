import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

//https://hardhat.org/hardhat-runner/docs/config#json-rpc-based-networks

let accounts = [""]

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "chiado",
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
  },
  etherscan: {
    customChains: [
      {
        network: "chiado",
        chainId: 10200,
        urls: {
          apiURL: "https://blockscout.com/gnosis/chiado/api",
          browserURL: "https://blockscout.com/gnosis/chiado",
        },
      },
      {
        network: "gnosis",
        chainId: 100,
        urls: {
          apiURL: "https://blockscout.com/xdai/mainnet/api",
          browserURL: "https://blockscout.com/xdai/mainnet",
        },
      },
    ],
    apiKey: {
      //blockscout explorer verification does not require keys
      chiado: "",
      gnosis: "",
    },
  }
};

export default config;