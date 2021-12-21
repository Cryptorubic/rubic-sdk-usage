import { FunctionComponent, useState } from 'react';
import React from 'react';
import { SDK } from 'rubic-sdk';
import { BLOCKCHAIN_NAME } from 'rubic-sdk/dist/core/blockchain/models/BLOCKCHAIN_NAME';
import { PriceToken } from 'rubic-sdk/dist/core/blockchain/tokens/price-token';
import { PriceTokenAmount } from 'rubic-sdk/dist/core/blockchain/tokens/price-token-amount';
import { TypedTrade } from 'rubic-sdk/dist/features/swap/models/typed-trade';
import { CommonTradeInfo } from 'src/pages/InstantTrades/CommonTradeInfo';
import { InstantTrade } from 'src/pages/InstantTrades/Instanttrade';
import useAsyncEffect from 'use-async-effect';
import { BigNumber } from 'bignumber.js';

// @ts-ignore
import { Loader, Box} from 'rimble-ui';

type IProps = {
    sdk: SDK;
}

export const InstantTradesPage: React.FC<IProps> = ({ sdk }) => {
    const fromTokenConst = {
        address: '0x0000000000000000000000000000000000000000',
        blockchain: BLOCKCHAIN_NAME.POLYGON
    };
    const toTokenConst = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174';
    const fromAmountConst = 0.001;


    const [trades, setTrades] = useState<TypedTrade[] | null>(null);

    const [fromToken, setFromToken] = useState<PriceTokenAmount | null>(null);

    const [toToken, setToToken] = useState<PriceToken | null>(null);

    useAsyncEffect(async () => {
        const trades = await sdk.instantTrades.calculateTrade(fromTokenConst, fromAmountConst, toTokenConst);
        setTrades(trades);
    }, [setTrades]);

    useAsyncEffect(async () => {
        const from = await PriceTokenAmount.createToken(
            { ...fromTokenConst, weiAmount: new BigNumber(fromAmountConst).multipliedBy(10**18) }
        );
        setFromToken(from);
    }, [setFromToken]);

    useAsyncEffect(async () => {
        const to = await PriceToken.createToken(
            { blockchain: fromTokenConst.blockchain, address: toTokenConst}
        );
        setToToken(to);
    }, [setToToken]);

    return(
        <>
            { fromToken && toToken ?
                <CommonTradeInfo fromToken={fromToken!!} toToken={toToken!!} /> :
                <Box mx={4} display="flex" alignItems="center">
                    Loading tokens...
                    <Loader size="28px" ml={2} />
                </Box>
            }

            { !trades ?
                <Box mx={4} display="flex" alignItems="center">
                    Loading trades...
                    <Loader size="28px" ml={2} />
                </Box> :
                <ul>
                    { trades!!.map(trade =>
                        <li key={trade.type}>
                            <InstantTrade instantTrade={trade} />
                        </li>
                    )}
                </ul>
            }
        </>
    )

}
