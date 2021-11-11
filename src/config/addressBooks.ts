// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getAddressBookByNetwork = (network: string) => {
  switch (network) {
    case "mainnet":
      return {
        Gelato: "0x3CACa7b48D0573D793d3b0279b5F0029180E83b6",
        GUniDaiUsdc: "",
        ChainlinkDaiUsd: "",
        ChainlinkUsdcUsd: "",
        ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        WETH: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      };

    case "goerli":
      return {
        Gelato: "",
        GUniDaiUsdc: "",
        ChainlinkDaiUsd: "",
        ChainlinkUsdcUsd: "",
        ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        WETH: "", 
      };
    case "hardhat":
      return {
        Gelato: "0x3CACa7b48D0573D793d3b0279b5F0029180E83b6",
        GUniDaiUsdc: "",
        ChainlinkDaiUsd: "",
        ChainlinkUsdcUsd: "",
        ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        WETH: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      };

    default: {
      throw new Error(`addressBooks: network: ${network} not supported`);
    }
  }
};
