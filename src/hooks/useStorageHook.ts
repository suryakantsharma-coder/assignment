import { useEffect, useState } from "react";

function useStorageHook() {

    const [contractAddress, setContractAddress] = useState<Array<string>>([]);
    const [address, setAddress] = useState();

    const storeContracts = (data: string) => {
        try {
            const isAddress = localStorage.getItem('addresses');
            if (isAddress) {
                const addresses = JSON.parse(isAddress);
                addresses.push(data);
                setContractAddress([...contractAddress, data]);
                localStorage.setItem('addresses', JSON.stringify(addresses));
            } else {
                localStorage.setItem('addresses', JSON.stringify([data]));
            }
        } catch (err) {
            console.log(err);
        }
    }


    const getStoredContracts = () => {
        try {
            const isAddress = localStorage.getItem('addresses');
            if (isAddress) {
                const addresses = JSON.parse(isAddress);
                setContractAddress(addresses);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getStoredContracts();
    }, [])

    return {
        contractAddress,
        getStoredContracts,
        storeContracts,
    };
}

export default useStorageHook;