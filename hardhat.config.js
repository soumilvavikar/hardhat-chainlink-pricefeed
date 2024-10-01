require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/**
 * Setting up the constants for properties we read from .env file.
 */
const { INFURA_API_KEY, SEPOLIA_PRIVATE_KEY } = process.env;
const ETHER_SCAN_KEY = process.env.ETHERSCAN_API_KEY;


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  // Setup the default network to be Sepolia
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      // We can use Infura or Alchemy as the test-nets. In this example, we have used infura
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  },
  hardhat: {
    chainId: 31337,
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHER_SCAN_KEY
  }
};
