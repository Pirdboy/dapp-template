// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetFixedSupply.sol";

// 发行固定总量的代币
contract ERC20FixedSupply is ERC20PresetFixedSupply {
    constructor(
        string memory name,
        string memory symbol,
        uint initialSupply,
        address owner
    ) ERC20PresetFixedSupply(name, symbol, initialSupply, owner) {}
}
