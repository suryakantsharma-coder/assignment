import { isAddress } from 'ethers';
import useStorageHook from '../hooks/useStorageHook';
import useFetchHook from '../hooks/useFetchHook';
import { useEffect } from 'react';
import { useWallet } from '../context/walletProvider';

function Protfolio() {
  const { contractAddress, storeContracts } = useStorageHook();
  const { connect, provider } = useWallet();
  const { data, fetchTokens, protfolio } = useFetchHook();

  useEffect(() => {
    if (contractAddress?.length > 0) fetchTokens(contractAddress);
  }, [contractAddress, provider]);

  return (
    <div>
      <h1>Protfolio</h1>

      {!provider && (
        <button style={{ margin: '10px' }} onClick={connect}>
          Connect Wallet
        </button>
      )}

      {provider && (
        <div>
          <input
            style={{ margin: '10px', width: '460px', height: 20 }}
            type="text"
            placeholder="Enter the contract address"
            onChange={(e) => {
              console.log(e.target.value);
              if (isAddress(e.target.value)) {
                storeContracts(e.target.value);
              }
            }}
          />

          <ol
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {data?.map((item, index) => {
              return (
                <>
                  {item?.name && (
                    <li
                      style={{
                        width: '400px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '10px',
                      }}
                    >
                      <p>{index + 1 + '. ' + item?.name}</p>
                      <p>{parseFloat(item?.balance).toFixed(2) + ' ' + item?.symbol}</p>
                    </li>
                  )}
                </>
              );
            })}
          </ol>

          <p>Total: {protfolio}</p>
        </div>
      )}
    </div>
  );
}

export default Protfolio;
