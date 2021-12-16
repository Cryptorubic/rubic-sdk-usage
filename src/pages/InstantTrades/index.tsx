import React from 'react';
import SDK from 'rubic-sdk';
import { useRubicSdk } from 'src/hooks/useRubicSdk';
import { configuration } from 'src/rpc-providers';

export const InstantTrades = () => {
    const sdk = useRubicSdk(configuration);

    return (
        <div>
            <h1>Instant trades</h1>
            {
                !sdk ? <div>...Loading</div> : <div>Success</div>
            }
        </div>
    )
}
