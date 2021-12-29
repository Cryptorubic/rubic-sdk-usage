import { FunctionComponent, useCallback } from 'react';
// @ts-ignore
import { Card, Heading, Button, Box } from 'rimble-ui';
import { InstantTrade } from 'rubic-sdk';
import { isOneInchLikeTrade, isUniswapV2LikeTrade } from 'rubic-sdk/lib/features/swap/type-guards';

import { WalletButton } from 'src/components/WalletButton';
import { useAddress } from 'src/hooks/useAddress';

interface IProps {
    instantTrade: InstantTrade
}

export const InstantTradeComponent: FunctionComponent<IProps> = ({ instantTrade }) => {
    const { state: address } = useAddress();

    const onSwap = useCallback(async () => {
        // @ts-ignore
        const onConfirm = (hash) => window.toastProvider.addMessage('Processing swap...', {
            secondaryMessage: 'Check progress on Explorer',
            actionHref:
                `https://polygonscan.com/tx/${hash}`,
            actionText: 'Check on explorer',
            variant: 'processing',
        });

        // @ts-ignore
        const onApprove = (hash) => window.toastProvider.addMessage('Processing approve...', {
            secondaryMessage: 'Check progress on Explorer',
            actionHref:
                `https://polygonscan.com/tx/${hash}`,
            actionText: 'Check on explorer',
            variant: 'processing',
        });

        await instantTrade.swap({onConfirm, onApprove});

        //@ts-ignore
        window.toastProvider.addMessage('Successful swap', {
            variant: 'success',
        })
    }, [instantTrade])

    return (
        <Card mb={3} mx={4} p={0} px={4} pb={4}>
            <Heading.h4>{instantTrade.type}</Heading.h4>
            <Box mb={4}>
                <Box>
                    <span><b>You get:</b></span>{'  '}
                    <span>{instantTrade.to.tokenAmount.toFormat(3)}</span>{' '}
                    <span>{instantTrade.to.symbol}</span>
                </Box>
                {(isUniswapV2LikeTrade(instantTrade) || isOneInchLikeTrade(instantTrade)) &&
                    <Box mt={2}>Path: {instantTrade.path.map(t => t.symbol).join(' ➞ ')}</Box>
                }
            </Box>
            {
                address ?  <Button onClick={onSwap}>Swap</Button> : <WalletButton />
            }

        </Card>
    )
}
