import React from "react";
import { connectWallet, getCurrentWalletConnected } from "../utils/interact.js";
import "../index.css"

const ConnectsWallet = () => {
    const [walletAddress, setWallet] = React.useState("");
    const [status, setStatus] = React.useState("");

    const connectWalletPressed = async () => {
        const walletResponse = await connectWallet();
        setStatus(() => walletResponse.status);
        setWallet(() => walletResponse.address);
    };

    React.useEffect(async () => {
        const {address, status} = await getCurrentWalletConnected();
        setWallet(address)
        setStatus(status); 

        addWalletListener();
    }, []);


    function addWalletListener() {
        if (window.ethereum) {
          window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
              setWallet(accounts[0]);
              setStatus("👆🏽 Write a message in the text-field above.");
            } else {
              setWallet("");
              setStatus("🦊 Connect to Metamask using the top right button.");
            }
          });
        } else {
          setStatus(
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          );
        }
      }

    return(
        <div className="wallet-connect">
            <button type="button" className="connect" onClick={connectWalletPressed}>Connect Wallet</button>
        </div>
    );
}

export default ConnectsWallet;
