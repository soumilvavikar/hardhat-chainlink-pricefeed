import logging
from web3 import Web3

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# If using mainnet / testnet, it has to be infura or alchemy url
BLOCKCHAIN_URL = "http://127.0.0.1:8545"

# 1. Connect to the blockchain node
w3 = Web3(Web3.HTTPProvider(BLOCKCHAIN_URL))

# 2. Load the contract ABI
contract_abi = [
    {
        "inputs": [],
        "name": "getETHUSD",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function",
    }
]

# 3. Set the contract address
contract_address = "0x8A5450CE448A84ac5E6AEA0cA03FB16D590D6227"

# 4. Create a contract instance
contract = w3.eth.contract(address=contract_address, abi=contract_abi)


def call_contract_function():
    # Call the contract function
    result = contract.functions.getETHUSD().call()
    print("ETH to USD Price Feed:", result)


if __name__ == "__main__":
    try:
        # Call the function to interact with the contract
        call_contract_function()
    except Exception as e:
        print(f"An error occurred: {str(e)}")
