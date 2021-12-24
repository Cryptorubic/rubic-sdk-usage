import { useCallback, useEffect, useState } from 'react';
import { makeObservable } from 'src/common/MakeObservable';
import SDK, { Configuration } from 'rubic-sdk';

const sdkStore = makeObservable<SDK | null>(null);

export const useRubicSdk = () => {
    const [sdk, setSdk] = useState<SDK | null>(sdkStore.get());

    useEffect(() => {
        return sdkStore.subscribe(setSdk);
    }, [sdk, setSdk]);

    const setConfiguration = useCallback(async (configuration: Configuration) => {
            const sdk = await SDK.createSDK(configuration);
            sdkStore.set(sdk);
        }
    , [setSdk])

    return {
        sdk,
        setConfiguration
    }
}
