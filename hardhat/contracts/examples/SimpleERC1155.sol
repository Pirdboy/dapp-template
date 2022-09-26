// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SimpleERC1155 is ERC1155, Ownable {
    using Counters for Counters.Counter;
    using Strings for string;

    string public name;
    string public symbol;
    string public baseURI;
    Counters.Counter currentTokenId;
    mapping(uint => uint) totalSupply;  // tokenId => amount

    constructor(string memory _baseURI) ERC1155(_baseURI) {
        baseURI = _baseURI;
        name = "SimpleERC1155";
        symbol = "SPL";
    }

    function mint(uint _amount) external returns (uint){
        currentTokenId.increment();
        uint _currentTokenId = currentTokenId.current();
        _mint(msg.sender, _currentTokenId, _amount, "");
        return _currentTokenId;
    }
    
    function uri(uint _tokenId) public view virtual override returns (string memory) {
        return string(abi.encodePacked(baseURI, Strings.toString(_tokenId), ".json"));
    }
}