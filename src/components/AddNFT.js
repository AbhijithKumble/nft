import React from "react";
import "../index.css";

const AddNFT = () => {
  const [nameOFNft, setName] = React.useState("");
  const [descriptionNFT, setDescription] = React.useState("");
  const [url, changeURL] = React.useState("");

  /*
    //State variables
    const [walletAddress, setWallet] = useState("");
    const [status, setStatus] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [url, setURL] = useState("");
    */

  const nameHandler = (value) => {
    setName(() => value);
  };

  const descriptionHandler = (value) => {
    setDescription(() => value);
  };

  const urlHandler = (value) => {
    changeURL(() => value);
  };

  const mintNFT = (e) => {
    e.preventDefault();
  }

  return (
    <div className="add-nft">
      <h1>NFT App</h1>
      <form>
        <label htmlFor="name" className="name">
          Name
        </label>
        <br></br>
        <input
          id="name"
          type="text"
          value={nameOFNft}
          placeholder="Write the name of the nft"
          onChange={(e) => nameHandler(e.target.value)}
        ></input>
        <br></br>
        <label htmlFor="description" className="description">
          Description
        </label>
        <br></br>
        <input
          id="description"
          type="text"
          placeholder="Describe the nft"
          value={descriptionNFT}
          onChange={(e) => descriptionHandler(e.target.value)}
        ></input>
        <br></br>
        <label htmlFor="nft" className="nft">
          Link to the nft{" "}
        </label>
        <br></br>
        <input
          id="nft"
          type="url"
          value={url}
          placeholder="eg : https://green-worldwide-moose-71.mypinata.cloud/ipfs/<hash>"
          onChange={(e) => urlHandler(e.target.value)}
        ></input>
        <br></br>
        <button className="mint-nft" onClick={(e) => mintNFT(e)}>Mint NFT</button>
      </form>
    </div>
  );
};

export default AddNFT;
