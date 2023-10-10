import {pinJSONToIPFS} from './pinata.js'

require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const contractABI = require('../../artifacts/contracts/MyNFT.sol/MyNFT.json')
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"

export const mintNFT = async(url, name, description) => {
    //error handling
    if (url.trim() == "" || (name.trim() == "" || description.trim() == "")) { 
           return {
               success: false,
               status: "❗Please make sure all fields are completed before minting.",
           }
     }
   
     //make metadata
     const metadata = new Object();
     metadata.name = name;
     metadata.image = url;
     metadata.description = description;
   
     //make pinata call
     const pinataResponse = await pinJSONToIPFS(metadata);
     if (!pinataResponse.success) {
         return {
             success: false,
             status: "😢 Something went wrong while uploading your tokenURI.",
         }
     } 
    const tokenURI = pinataResponse.pinataUrl;  
    window.contract = await new web3.eth.Contract(contractABI, contractAddress);
}

export const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          status: "👆🏽 Write a message in the text-field above.",
          address: addressArray[0],
        };
        return obj;
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };

  export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: "👆🏽 Write a message in the text-field above.",
          };
        } else {
          return {
            address: "",
            status: "🦊 Connect to Metamask using the top right button.",
          };
        }
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };