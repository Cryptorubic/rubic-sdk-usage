import { useEffect, useState } from 'react';
import React from 'react';
import { BLOCKCHAIN_NAME, BlockchainName, CrossChainTrade, SDK } from 'rubic-sdk';
import { validateAddresses } from 'src/common/utils';
import { CommonCCRTradeInfo } from 'src/pages/CrossChain/components/CommonCCRTradeInfo';
import { CrossChainTradeBlock } from 'src/pages/CrossChain/components/CrossChainTrade';
import { exampleTokens } from 'src/pages/InstantTrades/constants/example-tokens';
import useAsyncEffect from 'use-async-effect';

// @ts-ignore
import { Loader, Box} from 'rimble-ui';

type IProps = {
    sdk: SDK;
}

export const CrossChainPage: React.FC<IProps> = ({ sdk }) => {
    const [fromBlockchain, setFromBlockchain] = useState<BlockchainName>(BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN);
    const [toBlockchain, setToBlockchain] = useState<BlockchainName>(BLOCKCHAIN_NAME.POLYGON);

    const [fromTokenConst, setFromTokenConst] = useState<string>(exampleTokens[fromBlockchain].from);
    const [toTokenConst, setToTokenConst] = useState<string>(exampleTokens[toBlockchain].to);
    const [fromAmountConst, setFromAmountConst] = useState<number>(460_000);

    const [trade, setTrade] = useState<CrossChainTrade | null>(null);


    useAsyncEffect(async () => {
        if (!validateAddresses([fromTokenConst, toTokenConst])) {
            return;
        }

        const trade = await sdk.crossChain
            .calculateTrade(
                {blockchain: fromBlockchain, address: fromTokenConst},
                fromAmountConst.toString(),
                {
                    blockchain: toBlockchain,
                    address: toTokenConst
                }, {
                    fromSlippageTolerance: 0.2,
                    toSlippageTolerance: 0.02,
                    gasCalculation: 'disabled'
                });

        console.log(trade.trade);
        setTrade(trade.trade);
    }, [setTrade, fromBlockchain, toBlockchain, fromTokenConst, fromAmountConst, toTokenConst]);


    useEffect(() => {
        setFromTokenConst(exampleTokens[fromBlockchain]!.from);
    }, [fromBlockchain]);

    useEffect(() => {
        setToTokenConst(exampleTokens[toBlockchain]!.to);
    }, [toBlockchain])

    return(
        <>

            <CommonCCRTradeInfo
                fromAddress={fromTokenConst}
                toAddress={toTokenConst}
                amount={fromAmountConst}
                onFromAddressChange={setFromTokenConst}
                onToAddressChange={setToTokenConst}
                fromBlockchain={fromBlockchain}
                toBlockchain={toBlockchain}
                onFromBlockchainChange={setFromBlockchain}
                onToBlockchainChange={setToBlockchain}
                onAmountChange={setFromAmountConst}
            />


            { !trade ?
                <Box mx={4} display="flex" alignItems="center">
                    Loading trades...
                    <Loader size="28px" ml={2} />
                </Box> :
                <CrossChainTradeBlock trade={trade} />

            }
        </>
    )

}
