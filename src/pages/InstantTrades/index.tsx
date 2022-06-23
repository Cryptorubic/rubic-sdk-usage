import React, { useMemo, useState } from 'react';
import { useRubicSdk } from 'src/hooks/useRubicSdk';
import { InstantTradesPage } from 'src/pages/InstantTrades/components/InstantTradesPage';

// @ts-ignore
import { Loader, Heading, Box, Select } from 'rimble-ui';
import { BLOCKCHAIN_NAME, BlockchainName } from 'rubic-sdk';

export const InstantTrades = () => {
    const { sdk } = useRubicSdk();
    const options = useMemo(() => Object.values(BLOCKCHAIN_NAME).map(value => ({ value, label: value })), []);

    const [blockchain, serBlockchain] = useState<BlockchainName>(options[2].value);

    return (
        <div>
            <Heading.h2 mx={4} display="flex" alignItems="center">
                Instant trades
                <Select
                    ml={2}
                    required={true}
                    options={options}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => serBlockchain(e.target.value as BlockchainName)}
                />
            </Heading.h2>
            {
                !sdk ?
                <Box mx={4}>
                    <span>...Loading SDK</span>
                    <Loader size="40px" />
                </Box> :
                <InstantTradesPage blockchain={blockchain} sdk={sdk} />
            }
        </div>
    )
}
