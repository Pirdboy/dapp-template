// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ERC1155NFT is ERC1155 {
    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant SWORD = 2;
    uint256 public constant SHIELD = 3;
    uint256 public constant CROWN = 4;

    // {id}这个地方是留给客户端自行去替换
    constructor() ERC1155("ipfs://QmXmGZ1Bjqa8zry8gHbgGGS85ETMUCcFiGj4GnRo6NtaZh/{id}.json") {
        // ERC1155 同一个tokenid可以被mint多次,增加该代币数量,
        _mint(msg.sender, GOLD, 10**18, "");
        _mint(msg.sender, SILVER, 10**18, "");
        _mint(msg.sender, SWORD, 1000, "");
        _mint(msg.sender, SHIELD, 1000, "");
        _mint(msg.sender, CROWN, 1, "");
    }

    // 类似ERC721的tokenURI
    // opensea不支持{id}.json这种形式,因此需要我们重写uri函数
    // function uri(uint256 tokenid) public pure override returns (string memory) {
    //     return
    //         string(
    //             abi.encodePacked(
    //                 "https://ipfs.io/ipfs/bafybeihjjkwdrxxjnuwevlqtqmh3iegcadc32sio4wmo7bv2gbf34qs34a/",
    //                 Strings.toString(tokenid),
    //                 ".json"
    //             )
    //         );
    // }
}
