import { expect } from "chai";
import { ethers } from "hardhat";
import { getAddressBookByNetwork } from "../src/config";
import { IGUniPool, GUniOracle } from "../typechain";

const addresses = getAddressBookByNetwork("mainnet");

describe("Test GUniOracle", function () {
    this.timeout(0);

    let guniDaiUsdc: IGUniPool;
    let guniUsdcUsdt: IGUniPool;
    let guniUsdcWeth: IGUniPool;
    let guniDaiUsdt: IGUniPool;
    let oracleDaiUsdc: GUniOracle;
    let oracleUsdcUsdt: GUniOracle;
    let oracleUsdcWeth: GUniOracle;
    let oracleDaiUsdt: GUniOracle;
    let chainlinkEthUsd: GUniOracle;

    before(async function () {
        guniDaiUsdc = await ethers.getContractAt(
            "IGUniPool",
            addresses.GUniDaiUsdc
        );
        guniUsdcUsdt = await ethers.getContractAt(
            "IGUniPool",
            addresses.GUniUsdcUsdt
        );
        guniDaiUsdt = await ethers.getContractAt(
            "IGUniPool",
            addresses.GUniDaiUsdt
        );
        guniUsdcWeth = await ethers.getContractAt(
            "IGUniPool",
            addresses.GUniUsdcWeth
        );
        const oracleFactory = await ethers.getContractFactory("GUniOracle");
        oracleDaiUsdc = (await oracleFactory.deploy(addresses.GUniDaiUsdc, addresses.ChainlinkDaiUsd, addresses.ChainlinkUsdcUsd)) as GUniOracle;
        oracleDaiUsdt = (await oracleFactory.deploy(addresses.GUniDaiUsdt, addresses.ChainlinkDaiUsd, addresses.ChainlinkUsdtUsd)) as GUniOracle;
        oracleUsdcUsdt = (await oracleFactory.deploy(addresses.GUniUsdcUsdt, addresses.ChainlinkUsdcUsd, addresses.ChainlinkUsdtUsd)) as GUniOracle;
        oracleUsdcWeth = (await oracleFactory.deploy(addresses.GUniUsdcWeth, addresses.ChainlinkUsdcUsd, addresses.ChainlinkEthUsd)) as GUniOracle;
        chainlinkEthUsd = await ethers.getContractAt("GUniOracle", addresses.ChainlinkEthUsd);
    });

    it("should give correct oracle prices", async function () {
        // test1
        console.log("--- DAI/USDC ---");
        let [amount0, amount1] = await guniDaiUsdc.getUnderlyingBalances();
        let supply = await guniDaiUsdc.totalSupply();
        let priceCheck = (Number(ethers.utils.formatEther(amount0)) + Number(ethers.utils.formatUnits(amount1, "6"))) / Number(ethers.utils.formatEther(supply))
        console.log("naive price:", priceCheck.toString());
        let oraclePrice = Number(ethers.utils.formatEther(await oracleDaiUsdc.latestAnswer()));
        console.log("oracle price:", oraclePrice.toString());
        let priceDifferential = (priceCheck - oraclePrice) ** 2;
        let maxDifferential = (priceCheck * 3 / 100) ** 2;
        expect(maxDifferential).is.gte(priceDifferential);

        // test2
        console.log("--- DAI/USDT ---");
        [amount0, amount1] = await guniDaiUsdt.getUnderlyingBalances();
        supply = await guniDaiUsdt.totalSupply();
        priceCheck = (Number(ethers.utils.formatEther(amount0)) + Number(ethers.utils.formatUnits(amount1, "6"))) / Number(ethers.utils.formatEther(supply))
        console.log("naive price:", priceCheck.toString());
        oraclePrice = Number(ethers.utils.formatEther(await oracleDaiUsdt.latestAnswer()));
        console.log("oracle price:", oraclePrice.toString());
        priceDifferential = (priceCheck - oraclePrice) ** 2;
        maxDifferential = (priceCheck * 3 / 100) ** 2;
        expect(maxDifferential).is.gte(priceDifferential);

        // test3
        console.log("--- USDC/USDT ---");
        [amount0, amount1] = await guniUsdcUsdt.getUnderlyingBalances();
        supply = await guniUsdcUsdt.totalSupply();
        priceCheck = (Number(ethers.utils.formatUnits(amount0, "6")) + Number(ethers.utils.formatUnits(amount1, "6"))) / Number(ethers.utils.formatEther(supply))
        console.log("naive price:", priceCheck.toString());
        oraclePrice = Number(ethers.utils.formatEther(await oracleUsdcUsdt.latestAnswer()));
        console.log("oracle price:", oraclePrice.toString());
        priceDifferential = (priceCheck - oraclePrice) ** 2;
        maxDifferential = (priceCheck * 3 / 100) ** 2;
        expect(maxDifferential).is.gte(priceDifferential);

        // test4
        console.log("--- USDC/WETH ---");
        [amount0, amount1] = await guniUsdcWeth.getUnderlyingBalances();
        supply = await guniUsdcWeth.totalSupply();
        const ethPriceRaw = await chainlinkEthUsd.latestAnswer();
        const oracleDecimals = await chainlinkEthUsd.decimals();
        const ethPrice = Number(ethers.utils.formatUnits(ethPriceRaw, oracleDecimals.toString()));
        priceCheck = (Number(ethers.utils.formatUnits(amount0, "6")) + (Number(ethers.utils.formatEther(amount1)) * ethPrice)) / Number(ethers.utils.formatEther(supply))
        console.log("naive price:", priceCheck.toString());
        oraclePrice = Number(ethers.utils.formatEther(await oracleUsdcWeth.latestAnswer()));
        console.log("oracle price:", oraclePrice.toString());
        priceDifferential = (priceCheck - oraclePrice) ** 2;
        maxDifferential = (priceCheck * 3 / 100) ** 2;
        expect(maxDifferential).is.gte(priceDifferential);
    });
});
