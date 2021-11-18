// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getAddressBookByNetwork = (network: string) => {
  switch (network) {
    case "mainnet":
      return {
        Gelato: "0x3CACa7b48D0573D793d3b0279b5F0029180E83b6",
        GUniDaiUsdc: "0xAbDDAfB225e10B90D798bB8A886238Fb835e2053",
        GUniUsdcUsdt: "0x02F88164060912EE44BA9480D05d462D20cfF3bC",
        GUniDaiUsdt: "0xD58c89181360Dd9166881fce2Bc7C9Baae2D5f31",
        GUniUsdcWeth: "0xa6c49FD13E50a30C65E6C8480aADA132011D0613",
        ChainlinkDaiUsd: "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9",
        ChainlinkUsdcUsd: "0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6",
        ChainlinkUsdtUsd: "0x3E7d1eAB13ad0104d2750B8863b489D65364e32D",
        ChainlinkEthUsd: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
        ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        WETH: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      };

    case "goerli":
      return {
        Gelato: "",
        GUniDaiUsdc: "",
        GUniUsdcUsdt: "",
        GUniDaiUsdt: "",
        GUniUsdcWeth: "",
        ChainlinkDaiUsd: "",
        ChainlinkUsdcUsd: "",
        ChainlinkUsdtUsd: "",
        ChainlinkEthUsd: "",
        ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        WETH: "",
      };
    case "hardhat":
      return {
        Gelato: "0x3CACa7b48D0573D793d3b0279b5F0029180E83b6",
        GUniDaiUsdc: "0xAbDDAfB225e10B90D798bB8A886238Fb835e2053",
        GUniUsdcUsdt: "0x02F88164060912EE44BA9480D05d462D20cfF3bC",
        GUniDaiUsdt: "0xD58c89181360Dd9166881fce2Bc7C9Baae2D5f31",
        GUniUsdcWeth: "0xa6c49FD13E50a30C65E6C8480aADA132011D0613",
        ChainlinkDaiUsd: "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9",
        ChainlinkUsdcUsd: "0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6",
        ChainlinkUsdtUsd: "0x3E7d1eAB13ad0104d2750B8863b489D65364e32D",
        ChainlinkEthUsd: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
        ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        WETH: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      };

    default: {
      throw new Error(`addressBooks: network: ${network} not supported`);
    }
  }
};
