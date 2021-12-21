import { FunctionComponent, useCallback } from 'react';
import { TypedTrade } from 'rubic-sdk/dist/features/swap/models/typed-trade';
// @ts-ignore
import { Card, Heading, Button, Box } from 'rimble-ui';
import { WalletButton } from 'src/components/WalletButton';
import { useAddress } from 'src/hooks/useAddress';

interface IProps {
    instantTrade: TypedTrade
}

export const InstantTrade: FunctionComponent<IProps> = ({ instantTrade }) => {
    const { state: address } = useAddress();

    const onSwap = useCallback(async () => {
        // @ts-ignore
        const onConfirm = (hash) => window.toastProvider.addMessage('Processing swap...', {
            secondaryMessage: 'Check progress on Etherscan',
            actionHref:
                `https://etherscan.io/tx/${hash}`,
            actionText: 'Check on explorer',
            variant: 'processing',
        });

        // @ts-ignore
        const onApprove = (hash) => window.toastProvider.addMessage('Processing approve...', {
            secondaryMessage: 'Check progress on Etherscan',
            actionHref:
                `https://etherscan.io/tx/${hash}`,
            actionText: 'Check on explorer',
            variant: 'processing',
        });

        await instantTrade.trade.swap({onConfirm, onApprove});

        //@ts-ignore
        window.toastProvider.addMessage('Successful swap...', {
            variant: 'success',
        })
    }, [instantTrade])

    return (
        <Card mb={3} mx={4} p={0} px={4} pb={4}>
            <Heading.h4>{instantTrade.type}</Heading.h4>
            <Box mb={4}>
                <span><b>You get:</b></span>{'  '}
                <span>{instantTrade.trade.to.tokenAmount.toFormat(3)}</span>{' '}
                <span>{instantTrade.trade.to.symbol}</span>
            </Box>

            {
                address ?  <Button onClick={onSwap}>Swap</Button> : <WalletButton />
            }

        </Card>
    )
}
