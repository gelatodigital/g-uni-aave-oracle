import { expect } from "chai";
import { ethers } from "hardhat";
import { getAddressBookByNetwork } from "../src/config";
import { IGUniPool, GUniOracle } from "../typechain";

const addresses = getAddressBookByNetwork("mainnet");

describe("Test GUniOracle", function () {
    this.timeout(0);

    let guniDaiUsdc: IGUniPool;
    let guniUsdcUsdt: IGUniPool;
    //let guniUsdcWeth: IGUniPool;
    let guniDaiUsdt: IGUniPool;
    let oracleDaiUsdc: GUniOracle;
    let oracleUsdcUsdt: GUniOracle;
    //let oracleUsdcWeth: GUniOracle;
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
        const oracleFactory = await ethers.getContractFactory("GUniOracle");
        oracleDaiUsdc = (await oracleFactory.deploy(addresses.GUniDaiUsdc, addresses.ChainlinkDaiEth, addresses.ChainlinkUsdcEth)) as GUniOracle;
        oracleDaiUsdt = (await oracleFactory.deploy(addresses.GUniDaiUsdt, addresses.ChainlinkDaiEth, addresses.ChainlinkUsdtEth)) as GUniOracle;
        oracleUsdcUsdt = (await oracleFactory.deploy(addresses.GUniUsdcUsdt, addresses.ChainlinkUsdcEth, addresses.ChainlinkUsdtEth)) as GUniOracle;
        chainlinkEthUsd = await ethers.getContractAt("GUniOracle", addresses.ChainlinkEthUsd);
    });

    it("should give correct oracle prices", async function () {
        // test1
        console.log("--- DAI/USDC 5bps---");
        let [amount0, amount1] = await guniDaiUsdc.getUnderlyingBalances();
        let supply = await guniDaiUsdc.totalSupply();
        let priceCheckUSD = (Number(ethers.utils.formatEther(amount0)) + Number(ethers.utils.formatUnits(amount1, "6"))) / Number(ethers.utils.formatEther(supply))
        console.log("naive price $:", priceCheckUSD.toString());
        let priceETH = Number(ethers.utils.formatUnits(await chainlinkEthUsd.latestAnswer(), (await chainlinkEthUsd.decimals()).toString()))
        console.log("price of eth:", priceETH.toString())
        let priceCheck = priceCheckUSD / priceETH
        console.log("naive price check:", priceCheck.toString())
        let oraclePrice = Number(ethers.utils.formatEther(await oracleDaiUsdc.latestAnswer()));
        console.log("oracle price:", oraclePrice.toString());
        let priceDifferential = (priceCheck - oraclePrice) ** 2;
        let maxDifferential = (priceCheck * 3 / 100) ** 2;
        expect(maxDifferential).is.gte(priceDifferential);

        // test2
        console.log("--- DAI/USDT 5bps---");
        [amount0, amount1] = await guniDaiUsdt.getUnderlyingBalances();
        supply = await guniDaiUsdt.totalSupply();
        priceCheckUSD = (Number(ethers.utils.formatEther(amount0)) + Number(ethers.utils.formatUnits(amount1, "6"))) / Number(ethers.utils.formatEther(supply))
        console.log("naive price $:", priceCheckUSD.toString());
        console.log("price of eth:", priceETH.toString())
        priceCheck = priceCheckUSD / priceETH
        console.log("naive price check:", priceCheck.toString())
        oraclePrice = Number(ethers.utils.formatEther(await oracleDaiUsdt.latestAnswer()));
        console.log("oracle price:", oraclePrice.toString());
        priceDifferential = (priceCheck - oraclePrice) ** 2;
        maxDifferential = (priceCheck * 3 / 100) ** 2;
        expect(maxDifferential).is.gte(priceDifferential);

        // test3
        console.log("--- USDC/USDT 5bps---");
        [amount0, amount1] = await guniUsdcUsdt.getUnderlyingBalances();
        supply = await guniUsdcUsdt.totalSupply();
        priceCheckUSD = (Number(ethers.utils.formatUnits(amount0, "6")) + Number(ethers.utils.formatUnits(amount1, "6"))) / Number(ethers.utils.formatEther(supply))
        console.log("naive price $:", priceCheckUSD.toString());
        console.log("price of eth:", priceETH.toString())
        priceCheck = priceCheckUSD / priceETH
        console.log("naive price check:", priceCheck.toString())
        oraclePrice = Number(ethers.utils.formatEther(await oracleUsdcUsdt.latestAnswer()));
        console.log("oracle price:", oraclePrice.toString());
        priceDifferential = (priceCheck - oraclePrice) ** 2;
        maxDifferential = (priceCheck * 3 / 100) ** 2;
        expect(maxDifferential).is.gte(priceDifferential);
    });
});
