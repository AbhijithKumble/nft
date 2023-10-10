import { connectWallet, getCurrentWalletConnected, mintNFT } from "./utils/interact.js";

const onMintPressed = async () => {
    const { status } = await mintNFT(url, name, description);
    setStatus(status);
};


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

    //pinata pin request
    const pinataResponse = await pinJSONToIPFS(metadata);
    if (!pinataResponse.success) {
        return {
            success: false,
            status: "😢 Something went wrong while uploading your tokenURI.",
        }
    } 
    const tokenURI = pinataResponse.pinataUrl;  

    //load smart contract
    window.contract = await new web3.eth.Contract(contractABI, contractAddress);//loadContract();

    //set up your Ethereum transaction
    const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        'data': window.contract.methods.mintNFT(window.ethereum.selectedAddress, tokenURI).encodeABI() //make call to NFT smart contract 
    };

    //sign transaction via Metamask
    try {
        const txHash = await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
        return {
            success: true,
            status: "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" + txHash
        }
    } catch (error) {
        return {
            success: false,
            status: "😥 Something went wrong: " + error.message
        }
    }
}