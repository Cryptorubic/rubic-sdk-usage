import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import React from 'react';
import { MAINNET_BLOCKCHAIN_NAME, PriceToken, PriceTokenAmount, SDK, Web3Pure, InstantTrade } from 'rubic-sdk';
import { useRubicSdk } from 'src/hooks/useRubicSdk';

import { CommonTradeInfo } from 'src/pages/InstantTrades/components/CommonTradeInfo';
import { InstantTradeComponent as InstantTradeComponent } from 'src/pages/InstantTrades/components/InstantTradeComponent';
import { exampleTokens } from 'src/pages/InstantTrades/constants/example-tokens';
import useAsyncEffect from 'use-async-effect';
import { BigNumber } from 'bignumber.js';

// @ts-ignore
import { Loader, Box} from 'rimble-ui';

type IProps = {
    sdk: SDK;
    blockchain: MAINNET_BLOCKCHAIN_NAME;
}

export const InstantTradesPage: React.FC<IProps> = ({ sdk, blockchain }) => {
    const [fromTokenConst, setFromTokenConst] = useState<{address: string}>({ address: exampleTokens[blockchain].from });
    const [toTokenConst, setToTokenConst] = useState<{address: string}>({address: exampleTokens[blockchain].to});
    const [fromAmountConst, setFromAmountConst] = useState<number>(0.001);

    const [trades, setTrades] = useState<InstantTrade[] | null>(null);

    const [fromToken, setFromToken] = useState<PriceTokenAmount | null>(null);

    const [toToken, setToToken] = useState<PriceToken | null>(null);

    const validateAddresses = (addresses: {address: string}[] | {address: string}) => {
        if (Array.isArray(addresses)) {
            return addresses.every(item => Web3Pure.isAddressCorrect(item.address));
        }
        return Web3Pure.isAddressCorrect(addresses.address);
    }

    const setFromTokenConstCallback = useCallback(address => {
        setFromTokenConst({address})
    }, [setFromTokenConst]);

    const setToTokenConstCallback = useCallback(address => {
        setToTokenConst({address})
    }, [setToTokenConst]);

    useAsyncEffect(async () => {
        if (!validateAddresses([fromTokenConst, toTokenConst])) {
            return;
        }

        const trades = await sdk.instantTrades
            .calculateTrade({blockchain, ...fromTokenConst}, fromAmountConst, toTokenConst.address);
        setTrades(trades);
    }, [setTrades, blockchain, fromTokenConst, fromAmountConst, toTokenConst]);

    useAsyncEffect(async () => {
        if (!validateAddresses(fromTokenConst)) {
            setFromToken(null);
            return;
        }
        const from = await sdk.tokens.createPriceTokenAmount(
            { blockchain, ...fromTokenConst, weiAmount: new BigNumber(fromAmountConst).multipliedBy(10**18) }
        );
        setFromToken(from);
    }, [setFromToken, fromTokenConst]);

    useAsyncEffect(async () => {
        if (!validateAddresses(toTokenConst)) {
            setToToken(null);
            return;
        }
        const to = await sdk.tokens.createPriceToken(
            { blockchain, ...toTokenConst}
        );
        setToToken(to);
    }, [setToToken, toTokenConst]);

    useEffect(() => {
        setFromTokenConst({address: exampleTokens[blockchain]!.from});
        setToTokenConst({address: exampleTokens[blockchain]!.to});
    }, [blockchain])

    return(
        <>

            <CommonTradeInfo
                fromToken={fromToken}
                toToken={toToken}
                fromAddress={fromTokenConst.address}
                toAddress={toTokenConst.address}
                amount={fromAmountConst}
                onFromAddressChange={setFromTokenConstCallback}
                onToAddressChange={setToTokenConstCallback}
                onAmountChange={setFromAmountConst}
            />


            { !trades ?
                <Box mx={4} display="flex" alignItems="center">
                    Loading trades...
                    <Loader size="28px" ml={2} />
                </Box> :
                <ul>
                    { trades!!.map(trade =>
                        <li key={trade.type}>
                            <InstantTradeComponent instantTrade={trade} />
                        </li>
                    )}
                </ul>
            }
        </>
    )

}
