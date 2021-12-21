import React from 'react';
import { useRubicSdk } from 'src/hooks/useRubicSdk';
import { InstantTradesPage } from 'src/pages/InstantTrades/InstantTradesPage';
import { configuration } from 'src/rpc-providers';

// @ts-ignore
import { Loader, Heading, Box, Pill } from 'rimble-ui';

export const InstantTrades = () => {
    const { sdk } = useRubicSdk();

    return (
        <div>
            <Heading.h2 mx={4} display="flex" alignItems="center">
                Instant trades
                <Pill color="primary" ml={2}>
                    Polygon
                </Pill>
            </Heading.h2>
            {
                !sdk ?
                <Box mx={4}>
                    <span>...Loading SDK</span>
                    <Loader size="40px" />
                </Box> :
                <InstantTradesPage sdk={sdk} />
            }
        </div>
    )
}
