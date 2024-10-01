// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Importing the chainlink AggregatorV3Interface
import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

/**
 * @title Price Feed Contract - for interacting with the Chainlink PriceFeed
 * @author Soumil Vavikar
 * @notice NA
 */
contract PriceFeed {
    /**
     * @dev Creating the two interfaces for the AggregatorV3Interface
     */
    AggregatorV3Interface internal eth_usd_price_feed;
    AggregatorV3Interface internal link_usd_price_feed;

    /**
     * In the constructor, we are initializing the above defined interfaces with their addresses
     */
    constructor() {
        /**
         * Network: Sepolia / URL: https://docs.chain.link/data-feeds/price-feeds/addresses?network=ethereum&page=1#sepolia-testnet
         * Aggregator: ETH/USD
         * Address: 0x694AA1769357215DE4FAC081bf1f309aDC325306
         * Aggregator: LINK/USD
         * Address: 0xc59E3633BAAC79493d908e63626716e204A45EdF
         */
        eth_usd_price_feed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
        link_usd_price_feed = AggregatorV3Interface(
            0xc59E3633BAAC79493d908e63626716e204A45EdF
        );
    }

    /**
     * Returns the latest price for ETH to USD conversion
     */
    function getETHUSD() public view returns (uint256) {
        // prettier-ignore
        (
            // uint80 roundID,
            ,int price
            ,//uint startedAt,
            , //uint timeStamp,
            , //uint80 answeredInRound
        ) = eth_usd_price_feed.latestRoundData();

        return uint256(price);
    }

    /**
     * Returns the latest price for the LINK to USD conversion
     */
    function getLINKUSD() public view returns (int) {
        // prettier-ignore
        (
            // uint80 roundID,
            ,int price
            ,//uint startedAt,
            , //uint timeStamp,
            , //uint80 answeredInRound
        ) = link_usd_price_feed.latestRoundData();

        return price;
    }
}
