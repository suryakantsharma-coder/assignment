import { useState } from 'react';
import { getCoinInfo } from '../data/getInfo';
import { useWallet } from '../context/walletProvider';
import { formatUnits } from 'ethers';

function useFetchHook() {
  const [data, setData] = useState<Array<any>>(); // store token info
  const { provider, address: WalletAddress } = useWallet(); // wallet context
  const [protfolio, setProtfolio] = useState(); // store protfolio value

  // here is the function to fetch the tokens
  const fetchTokens = async (addresses: Array<string>) => {
    try {
      if (provider && WalletAddress) {
        const tokens = addresses.map((address) => {
          return getCoinInfo(address, provider, WalletAddress);
        });

        const data = await Promise.allSettled(tokens);
        let protfolioValue: any = 0;

        const tokenInfo = data?.map((item) => {
          if (item.status === 'fulfilled' && item?.value !== null) {
            const tokenValue = formatUnits(item?.value?.balance, item?.value?.decimals);
            protfolioValue += parseFloat(tokenValue).toFixed(2);
            const tokenInfo = {
              name: item?.value?.name,
              balance: tokenValue,
              symbol: item?.value?.symbol,
            };
            return tokenInfo;
          }
        });

        if (tokenInfo) {
          setData(tokenInfo);
          setProtfolio(protfolioValue);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    data,
    fetchTokens,
    protfolio,
  };
}

export default useFetchHook;
