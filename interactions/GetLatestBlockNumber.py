import requests

# If using mainnet / testnet, it has to be infura or alchemy url
BLOCKCHAIN_URL = "http://127.0.0.1:8545/"

def get_latest_block_number():
    url = f"{BLOCKCHAIN_URL}"
    headers = {"Content-Type": "application/json"}
    data = {"jsonrpc": "2.0", "method": "eth_blockNumber", "params": [], "id": 1}
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return int(response.json()["result"], 16)  # Convert hex to decimal
    else:
        raise Exception(f"API request failed: {response.text}")


if __name__ == "__main__":
    latest_block = get_latest_block_number()
    print(f"Latest block number: {latest_block}")
