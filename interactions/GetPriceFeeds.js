import "hardhat";

async function main() {
    // Deployed Contract address here. 
    const contractAddress = "0x8A5450CE448A84ac5E6AEA0cA03FB16D590D6227";
    // This line will help retrieve the contract
    const priceFeed = await hre.ethers.getContractAt("PriceFeed", contractAddress);
    
    const ethToUsd = await priceFeed.getETHUSD();
    console.log("ethToUsd:", Number(ethToUsd));

    const linkToUsd = await priceFeed.getLINKUSD();
    console.log("linkToUsd:", Number(linkToUsd));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });