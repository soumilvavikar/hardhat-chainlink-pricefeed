const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
// Here we are building the module using the buildModule command. 
module.exports = buildModule("PriceFeedModule", (m) => {
    const module = m.contract("PriceFeed", []);

    m.call(module, "getETHUSD", []);
    m.call(module, "getLINKUSD", []);

    return { module };
});