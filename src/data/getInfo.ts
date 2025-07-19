import { Contract, Provider } from 'ethers';
import { Erc20ABI } from '../constant/abi';

// it's api free to fetch token info on different network no need any cost.
export const getCoinInfo = async (contractAddress: string, provider: Provider, address: string) => {
  try {
    const contract = new Contract(contractAddress, Erc20ABI, provider);
    const balance = await contract.balanceOf(address);
    const decimals = await contract.decimals();
    const symbol = await contract.symbol();
    const name = await contract.name();
    return { balance, decimals, symbol, name };
  } catch (err) {
    console.log('token fetch error', err);
    return null;
  }
};
