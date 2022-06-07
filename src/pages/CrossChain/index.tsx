import React, { useMemo } from 'react';
import { BLOCKCHAIN_NAME } from 'rubic-sdk';
import { useRubicSdk } from 'src/hooks/useRubicSdk';


// @ts-ignore
import { Loader, Heading, Box, Select, Field } from 'rimble-ui';
import { CrossChainPage } from 'src/pages/CrossChain/components/CrossChainPage';

export const CrossChain = () => {
    const { sdk } = useRubicSdk();
    const options = useMemo(() => Object.values(BLOCKCHAIN_NAME).map(value => ({ value, label: value })), []);

    return (
        <div>
            <Heading.h2 mx={4}>Cross Chain</Heading.h2>
            {
                !sdk ?
                <Box mx={4}>
                    <span>...Loading SDK</span>
                    <Loader size="40px" />
                </Box> :
                <CrossChainPage sdk={sdk} />
            }
        </div>
    )
}
