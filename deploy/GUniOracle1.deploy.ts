import { deployments, getNamedAccounts } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { getAddressBookByNetwork } from "../src/config";
import { DeployFunction } from "hardhat-deploy/types";
import { sleep } from "../src/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  if (
    hre.network.name === "mainnet" || hre.network.name === "goerli"
  ) {
    console.log(
      `Deploying G UNI Oracle DAI/USDC to ${hre.network.name}. Hit ctrl + c to abort`
    );
    await sleep(10000);
  }

  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const { GUniDaiUsdc1bps, ChainlinkDaiEth, ChainlinkUsdcEth } = getAddressBookByNetwork(hre.network.name);

  await deploy("GUniOracle", {
    from: deployer,
    args: [GUniDaiUsdc1bps, ChainlinkDaiEth, ChainlinkUsdcEth],
  });
};

export default func;

func.skip = async (hre: HardhatRuntimeEnvironment) => {
  const shouldSkip =
    hre.network.name === "mainnet" ||
    hre.network.name === "goerli";

  return shouldSkip ? true : false;
};

func.tags = ["GUniOracle1"];
