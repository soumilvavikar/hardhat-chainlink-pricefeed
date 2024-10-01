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
