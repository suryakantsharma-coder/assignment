import './App.css';
import { WalletProvider } from './context/walletProvider';
import Protfolio from './pages/protfolio';

function App() {
  return (
    <div className="App">
      <WalletProvider>
      <Protfolio />
      </WalletProvider>
    </div>
  );
}

export default App;
