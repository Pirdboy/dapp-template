const { expect } = require("chai");
const { ethers } = require("hardhat");

const BaseURI = "ipfs://QmXmGZ1Bjqa8zry8gHbgGGS85ETMUCcFiGj4GnRo6NtaZh/";
const NAME = "Colorful Bird";
const SYMBOL = "BIRD";
const mintPrice = ethers.utils.parseEther("0.01");

describe("ERC721NFT test", function () {
    let erc721NFT;
    let owner, signer2;
    beforeEach('Setup Contract', async () => {
        [owner, signer2] = await ethers.getSigners();
        const ERC721NFT = await ethers.getContractFactory('ERC721NFT');
        erc721NFT = await ERC721NFT.deploy(BaseURI);
        await erc721NFT.deployed();
    });

    it("test state variable", async () => {
        expect(await erc721NFT.name()).to.eq(NAME);
        expect(await erc721NFT.symbol()).to.eq(SYMBOL);
        expect(await erc721NFT.baseURI()).to.eq(BaseURI);
        expect(await erc721NFT.baseExtension()).to.eq(".json");
    });

    it("test mintNFT and tokenURI", async () => {
        await expect(erc721NFT.mintNFT()).to.be.revertedWith("must send the correct price");
        let tokenId = 1;
        let tokenURI = BaseURI + tokenId + ".json";
        await expect(erc721NFT.mintNFT({ value: mintPrice })).not.to.be.reverted;
        expect(await erc721NFT.ownerOf(tokenId)).to.eq(owner.address);
        expect(await erc721NFT.tokenURI(tokenId)).to.eq(tokenURI);
        expect(await erc721NFT.balanceOf(owner.address)).to.eq(1);

        tokenId++;
        tokenURI = BaseURI + tokenId + ".json";
        await expect(erc721NFT.connect(signer2).mintNFT({ value: mintPrice })).not.to.be.reverted;
        expect(await erc721NFT.ownerOf(tokenId)).to.eq(signer2.address);
        expect(await erc721NFT.tokenURI(tokenId)).to.eq(tokenURI);
        expect(await erc721NFT.balanceOf(signer2.address)).to.eq(1);
    });

    it("test max balance", async () => {
        expect(erc721NFT.setMaxBalance(2)).not.to.be.reverted;
        await expect(erc721NFT.connect(signer2).mintNFT({ value: mintPrice })).not.to.be.reverted;
        await expect(erc721NFT.connect(signer2).mintNFT({ value: mintPrice })).not.to.be.reverted;
        await expect(erc721NFT.connect(signer2).mintNFT({ value: mintPrice })).to.be.revertedWith("balance would exceed max balance");
    });

    it("test setter", async () => {
        await expect(erc721NFT.connect(signer2).setBaseURI("")).to.be.revertedWith("only owner is allowed");
        await expect(erc721NFT.connect(signer2).setMaxBalance(100)).to.be.revertedWith("only owner is allowed");
        await expect(erc721NFT.setBaseExtension(".png")).not.to.be.reverted;
    });
});
