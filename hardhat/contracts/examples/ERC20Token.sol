// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract ERC20Token is ERC20, AccessControl {
    address public admin;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant MY_ROLE = keccak256("MY_ROLE");

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        _mint(msg.sender, 10000 * 10**18);
        admin = msg.sender;

        _setupRole(MINTER_ROLE, _msgSender());
        _setupRole(BURNER_ROLE, _msgSender());
        _setupRole(PAUSER_ROLE, _msgSender());
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    // 创造代币
    function mint(address to, uint amount) external {
        require(msg.sender == admin, "Only admin allowed");
        _mint(to, amount);
    }

    // 销毁代币
    function burn(uint amount) external {
        _burn(msg.sender, amount);
    }
}
