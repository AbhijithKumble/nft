import './index.css';
import ConnectsWallet from "./components/ConnectsWallet";
import AddNFT from "./components/AddNFT";
import Output from "./components/Output";

function App() {
  return (
    <div className="App">
      <ConnectsWallet />
      <AddNFT />
      <Output />
    </div>
  );
}

export default App;
