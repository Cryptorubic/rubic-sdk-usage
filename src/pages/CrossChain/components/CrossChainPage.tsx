import { useEffect, useState } from 'react';
import React from 'react';
import {
    BLOCKCHAIN_NAME,
    BlockchainName,
    CelerCrossChainTrade,
    CROSS_CHAIN_TRADE_TYPE,
    CrossChainTrade,
    SDK
} from 'rubic-sdk';
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
    const [fromBlockchain, setFromBlockchain] = useState<BlockchainName>(BLOCKCHAIN_NAME.POLYGON);
    const [toBlockchain, setToBlockchain] = useState<BlockchainName>(BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN);

    const [fromTokenConst, setFromTokenConst] = useState<string>(exampleTokens[fromBlockchain].from);
    const [toTokenConst, setToTokenConst] = useState<string>(exampleTokens[toBlockchain].to);
    const [fromAmountConst, setFromAmountConst] = useState<number>(300);

    const [trade, setTrade] = useState<CrossChainTrade | null>(null);


    useAsyncEffect(async () => {
        if (!validateAddresses([fromTokenConst, toTokenConst])) {
            return;
        }

        const wrappedTrades = await sdk.crossChain
            .calculateTrade(
                {blockchain: fromBlockchain, address: fromTokenConst},
                fromAmountConst.toString(),
                {
                    blockchain: toBlockchain,
                    address: toTokenConst
                }, {
                    fromSlippageTolerance: 0.02,
                    toSlippageTolerance: 0.02,
                    gasCalculation: 'disabled',
                    fromAddress: '0x186915891222aDD6E2108061A554a1F400a25cbD'
                });

        console.log(wrappedTrades)

        const lifiTrade = wrappedTrades.find(wrappedTrade => wrappedTrade.tradeType === CROSS_CHAIN_TRADE_TYPE.LIFI)?.trade
        const fromTokenPrice = lifiTrade?.from.price
        console.log('From token price:', fromTokenPrice?.toFixed() || 'unknown')

        wrappedTrades.forEach(wrappedTrade => {
            console.log(wrappedTrade.tradeType, ':');
            if (wrappedTrade.error) {
                console.log('Error:', wrappedTrade.error)
            } else {
                console.log('Output amount:', wrappedTrade.trade!.to.tokenAmount.toFixed())
                if (wrappedTrade.tradeType === CROSS_CHAIN_TRADE_TYPE.CELER) {
                    console.log('Crypto fee amount', (wrappedTrade.trade as CelerCrossChainTrade)?.cryptoFeeToken.tokenAmount.toFixed())
                    const cryptoCost = (wrappedTrade.trade as CelerCrossChainTrade)?.cryptoFeeToken.price.multipliedBy((wrappedTrade.trade as CelerCrossChainTrade)?.cryptoFeeToken.tokenAmount);
                    console.log('Crypto fee cost:', cryptoCost?.toFixed())
                    console.log('Ratio:', fromTokenPrice?.plus(cryptoCost).dividedBy(wrappedTrade.trade!.to.tokenAmount).toFixed())
                } else {
                    console.log('Ratio:', fromTokenPrice?.dividedBy(wrappedTrade.trade!.to.tokenAmount.toFixed()).toFixed())
                }
            }
        })

        const bestTrade = wrappedTrades[0];
        if (bestTrade.error) {
            console.error(bestTrade.error);
        } else {
            setTrade(bestTrade.trade);
        }
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
