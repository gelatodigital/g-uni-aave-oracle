// SPDX-License-Identifier: agpl-3.0
pragma solidity =0.6.12;

interface IExtendedAggregator {
    enum TokenType {Invalid, Simple, Complex}

    enum PlatformId {Invalid, Simple, Uniswap, Balancer, GUni}

    /**
     * @dev Returns the LP shares token
     * @return address of the LP shares token
     */
    function getToken() external view returns (address);

    /**
     * @dev Returns the number of tokens that composes the LP shares
     * @return address[] memory of token addresses
     */
    function getSubTokens() external view returns (address[] memory);
    
    /**
     * @dev Returns the latest price
     * @return int256 price
     */
    function latestAnswer() external view returns (int256);

    /**
     * @dev Returns the decimals of latestAnswer()
     * @return uint8
     */
    function decimals() external pure returns (uint8);
    
    /**
     * @dev Returns the platform id to categorize the price aggregator
     * @return uint256 1 = Uniswap, 2 = Balancer, 3 = G-UNI
     */
    function getPlatformId() external pure returns (PlatformId);

    /**
     * @dev Returns token type for categorization
     * @return uint256 1 = Simple (Native or plain ERC20s), 2 = Complex (LP Tokens, Staked tokens)
     */
    function getTokenType() external pure returns (TokenType);
}