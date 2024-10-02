// This command will import all the tools and utils needed for working with hardhatW
require("@nomicfoundation/hardhat-toolbox");
// This command would import the plugin required to start the local ignition chain.
require("@nomicfoundation/hardhat-ignition-ethers");
require('dotenv').config();

/**
 * Setting up the constants for properties we read from .env file.
 */
const { INFURA_API_KEY, SEPOLIA_PRIVATE_KEY } = process.env;
const ETHER_SCAN_KEY = process.env.ETHERSCAN_API_KEY;

const MAINNET_RPC_URL =`https://sepolia.infura.io/v3/${INFURA_API_KEY}`;
const FORKING_BLOCK_NUMBER = parseInt(process.env.FORKING_BLOCK_NUMBER) || 0

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  // Setup the default network to be Sepolia
  defaultNetwork: "hardhat", // Change this to sepolia if you want to hit the request to Infura test net
  networks: {
    hardhat: {
      hardfork: "merge",
      // If you want to do some forking set `enabled` to true
      forking: {
          url: MAINNET_RPC_URL !== undefined ? MAINNET_RPC_URL : "",
          blockNumber: FORKING_BLOCK_NUMBER !== undefined ? FORKING_BLOCK_NUMBER : "",
          enabled: true,
      },
      chainId: 31337,
  },
    sepolia: {
      // We can use Infura or Alchemy as the test-nets. In this example, we have used infura
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
      chainId: 11155111,
    }
  },
  
  mocha: {
    timeout: 300000, // 300 seconds max for running tests
},
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHER_SCAN_KEY
  }
};
