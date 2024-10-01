import pkg from 'hardhat';
const { ethers } = pkg;
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

/** Get the API and Private KEYs from .env file */
const INFURA_API_KEY = process.env.INFURA_API_KEY;
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;

// Sepolia RPC URL
const sepoliaRpcUrl = 'https://sepolia.infura.io/v3/${INFURA_API_KEY}';

// Creating the RPC Provider for Infura - Sepolia 
const provider = new ethers.JsonRpcProvider(sepoliaRpcUrl);

// Creating a new Signer by passing the Sepolia Test Account's private key
const signer = new ethers.Wallet(SEPOLIA_PRIVATE_KEY, provider);

/**
 * Main function which deploys the contract to the test net and also calls the functions in the contract and print the response in the console. 
 */
async function main() {
  // Getting the signers (In this case ONLY one - that's us)
  const [deployer] = await ethers.getSigners();

  /** 
   * Get the account balance from the provider (not the signer) 
   *  - This is option step, this just costs more gas, we can avoid it, This is here for learning perspective. 
   */
  const accountBalance = await deployer.provider.getBalance(deployer.address);
  console.log("Deploying contracts with account: ", deployer.getAddress());
  console.log("Account balance: ", accountBalance.toString());

  /**
   * Getting the contract from the project and deploying it
   */
  const Token = await ethers.getContractFactory("PriceFeed");
  const token = await Token.deploy();
  // Waiting for the deployment to complete
  await token.waitForDeployment();

  /** Interact with the contract now. */

  // Getting ETH to USD price
  const ethUsdPrice = await token.getETHUSD();
  console.log(`Current ETH/USD price: ${ethUsdPrice}`);

  // Getting LINK to USD price
  const linkUsdPrice = await token.getLINKUSD();
  console.log(`Link/USD price: ${linkUsdPrice}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });