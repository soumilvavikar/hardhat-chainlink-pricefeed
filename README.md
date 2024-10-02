# Sample Hardhat Project for Connecting to Chainlink Price Feed

This project provides a boiler plate code to connect to the chainlink pricefeed using Hardhat.

## Setting up a new Hardhat Project

```shell
# Initialize the npm project
npm init
# Install Hardhat
npm install --save-dev hardhat
# Initialize Hardhat project 
npx hardhat init
```

**NOTE**:

- All the information on the code has been documented inline in the code. Refer to the contract and the deployment script for more details.
- .env file has not been pushed to git, please create your own.

## Command to Execute the Deploy Script

```shell
npx hardhat run scripts/deploy.js 
```

## Sample Console output of the deployment script

```shell
~/workspaces/hardhat-workspaces/hardhat-chainlink-pricefeed$ npx hardhat run scripts/deploy.js 

Deploying contracts with account:  Promise { '0x**************************************' }   >> Replaced the account details with * intentionally.

Account balance:  195842693411971046
Current ETH/USD price: 245429117341
Link/USD price: 1108038171
```

## Forking the Mainnet / Testnet on Local Ignition Chain

### First setup the ignition local node

#### Step 1: Install the Ignition Module

```shell
npm install --save-dev @nomicfoundation/hardhat-ignition-ethers
```

#### Step 2: Update the `hardhat.config.js`

Add the folloing imports

```js
// This command would import the plugin required to start the local ignition chain.
require("@nomicfoundation/hardhat-ignition-ethers");
```

Inside the networks section, add the following:

```js
hardhat: {
      hardfork: "merge",
      // If you want to do some forking set `enabled` to true
      forking: {
          url: MAINNET_RPC_URL !== undefined ? MAINNET_RPC_URL : "",
          blockNumber: FORKING_BLOCK_NUMBER !== undefined ? FORKING_BLOCK_NUMBER : "",
          enabled: true, //  set this to false if you want to disable forking
      },
      chainId: 31337,
  },
  ```

**NOTE**: The MAINNET_RPC_URL and FORKING_BLOCK_NUMBER are stored in the .env file.

#### Step 3: Create the `PriceFeedModule.js` in the `ignition/module` folder

```js
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
// Here we are building the module using the buildModule command. 
module.exports = buildModule("PriceFeedModule", (m) => {
    const module = m.contract("PriceFeed", []);

    m.call(module, "getETHUSD", []);
    m.call(module, "getLINKUSD", []);

    return { module };
});
```

#### Step 4: Spin the Local Forked Hardhat Node

```shell
# This will start the forked local node (if the `hardhat.config.js` has enabled field set to true inside the hardhat network's forking section).
npx hardhat node

OR 

# This command will fork the testnet infura at block number passed
npx hardhat node --fork https://sepolia.infura.io/v3/${INFURA_API_KEY} --fork-block-number 6800249

```

Based on the fork url configured, we can fork of the testnet (as we have done in our example) OR we can fork off the mainnet.

### Deploying the contract to Ignition LocalNet

```shell
npx hardhat ignition deploy ignition/modules/PriceFeedModule.js --network localhost
```

### Testing the Deployed Contract

The below command will run the GetPriceFeed.js which is an interaction and calls the deployed smart contract on the local instance of the ignition localnet.

```shell
npx hardhat run interactions/GetPriceFeeds.js --network localhost
```

NOTE: You will need to put the address of the deployed contract in the `GetPriceFeed.js`. The address of the deployed contract is printed in the console logs when it is successfully deployed using the `ignition deploy` command.

## Connecting to the Blockchain and Deployed Contract in Python

### Prerequistes

- Install Python
- Install request module of python

```shell
# Install python
sudo apt-get install python3.8
# Check version of the install python
python3 --version
# Install the requests module
pip install requests
# Install web3
pip install web3
```

### Write the .py file with the code

Refer to `.py` files in the interactions package.

#### Commands

```shell
# Command to call the latest block number function on the blockchain
python3 interactions/GetLatestBlockNumber.py 
# Command to call the get ETH to USD Pricefeed
python3 interactions/GetETHUSDPriceFeed.py 
# Command to call the get LINK to USD Pricefeed
python3 interactions/GetLINKUSDPriceFeed.py 
```
