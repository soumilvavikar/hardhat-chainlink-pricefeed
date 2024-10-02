const { ethers } = require("hardhat")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { assert } = require("chai")

describe("Price Feed Unit Tests", async function () {

    async function deployPriceConsumerFixture() {
        const [deployer] = await ethers.getSigners();

        const mockV3AggregatorFactory = await ethers.getContractFactory("MockV3Aggregator");
        const mockV3Aggregator = await mockV3AggregatorFactory.connect(deployer).deploy("18", "200000000000000000000");

        const mockV3AggregatorLINKUSDFactory = await ethers.getContractFactory("MockV3Aggregator");
        const mockV3LINKUSDAggregator = await mockV3AggregatorLINKUSDFactory.connect(deployer).deploy("0", "2000");

        const priceFeedFactory = await ethers.getContractFactory("PriceFeed");
        const priceFeed = await priceFeedFactory.connect(deployer).deploy();
        // Setting the address for the price feeds
        priceFeed.setETHUSDPriceFeed(mockV3Aggregator);
        priceFeed.setLINKUSDPriceFeed(mockV3LINKUSDAggregator);

        return { priceFeed, mockV3Aggregator, mockV3LINKUSDAggregator };
    }

    describe("Check Deployment of the Mocks", async function () {
        it("should set the ETH to USD and LINK to USD aggregator addresses correctly", async () => {
            const { priceFeed, mockV3Aggregator, mockV3LINKUSDAggregator } = await loadFixture(
                deployPriceConsumerFixture
            );
            const ethUsdResponse = await priceFeed.getPriceFeedForETHUSD();
            const linkUsdResponse = await priceFeed.getPriceFeedForLINKUSD();
            assert.equal(ethUsdResponse.address, mockV3Aggregator.address);
            assert.equal(linkUsdResponse.address, mockV3LINKUSDAggregator.address);
        });

    });

    describe("#getLatestPrice", async function () {
        it("Contract should return the same value as the mock for ETH to USD", async () => {
            const { priceFeed, mockV3Aggregator, mockV3LINKUSDAggregator } = await loadFixture(
                deployPriceConsumerFixture
            );
            const priceConsumerResult = await priceFeed.getETHUSD();
            const priceFeedResult = (await mockV3Aggregator.latestRoundData()).answer;
            assert.equal(priceConsumerResult.toString(), priceFeedResult.toString());
        });

        it("Contract should return the same value as the mock for LINK to USD", async () => {
            const { priceFeed, mockV3Aggregator, mockV3LINKUSDAggregator } = await loadFixture(
                deployPriceConsumerFixture
            );
            const priceConsumerResult = await priceFeed.getLINKUSD();
            const priceFeedResult = (await mockV3LINKUSDAggregator.latestRoundData()).answer;
            assert.equal(priceConsumerResult.toString(), priceFeedResult.toString());
        });
    });
});