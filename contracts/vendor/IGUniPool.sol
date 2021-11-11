// SPDX-License-Identifier: MIT
pragma solidity =0.6.12;

interface IGUniPool {
    function token0() external view returns (address);
    function token1() external view returns (address);
    function getUnderlyingBalancesAtPrice(uint160) external view returns (uint256, uint256);
    function totalSupply() external view returns (uint256);
}