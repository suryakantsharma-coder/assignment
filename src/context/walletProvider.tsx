import React, { createContext, useState, useContext } from 'react';
import { ethers, Provider } from 'ethers';

// Define the shape of wallet context
interface WalletContextType {
  provider: Provider | null;
  signer: ethers.Signer | null;
  address: string | null;
  connect: () => Promise<void>;
}

// Create the context
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Provider component
export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const connect = async () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        setProvider(provider);
        setSigner(signer);
        setAddress(address);
      } catch (err) {
        console.error('Failed to connect wallet:', err);
      }
    } else {
      alert('MetaMask is not installed');
    }
  };

  return (
    <WalletContext.Provider value={{ provider, signer, address, connect }}>
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook to use wallet context
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within a WalletProvider');
  return context;
};
