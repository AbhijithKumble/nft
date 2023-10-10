// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint16 maxNFT = 3000;
    
    constructor() ERC721("MyNFT", "NFT") {}

    function mintNFT(address recipient, string memory tokenURI)
        internal
        returns (uint256)
    {   
        require(uint16(_tokenIds.current()) <= maxNFT);

        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        
        return newItemId;
    }

    function mintToken(address to, string memory uri) public virtual payable {
  
        require(msg.value >= 10, "Not enough ETH sent; check price!"); 
        
        mintNFT(to, uri);
    }
}