import { useState } from 'react';
import { Configuration } from 'rubic-sdk/dist/core/sdk/models/configuration';
import useAsyncEffect from 'use-async-effect';
import { SDK } from 'rubic-sdk';

export function useRubicSdk(configuration: Configuration) {
    const [sdk, setSdk] = useState<SDK | undefined>();

    useAsyncEffect(async () => {
        const sdk = await SDK.createSDK(configuration);
        setSdk(sdk);
    }, [configuration])

    return sdk;
}
