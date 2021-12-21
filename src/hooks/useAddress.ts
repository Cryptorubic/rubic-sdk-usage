import { useEffect, useMemo, useState } from 'react';
import { makeObservable } from 'src/common/MakeObservable';

const addressStore = makeObservable("");

export const useAddress = () => {
    const [address, setAddress] = useState<string>(addressStore.get());

    useEffect(() => {
        return addressStore.subscribe(setAddress);
    }, []);

    const actions = useMemo(() => {
        return {
            setAddress: (address: string) => addressStore.set(address),
        }
    }, [address])

    return {
        state: address,
        actions
    }
}
