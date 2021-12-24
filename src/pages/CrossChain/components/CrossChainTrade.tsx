import { FunctionComponent, useCallback } from 'react';
// @ts-ignore
import { Card, Heading, Button, Box } from 'rimble-ui';
import { CrossChainTrade } from 'rubic-sdk';
import { WalletButton } from 'src/components/WalletButton';
import { useAddress } from 'src/hooks/useAddress';

interface IProps {
    trade: CrossChainTrade
}

export const CrossChainTradeBlock: FunctionComponent<IProps> = ({ trade }) => {
    const { state: address } = useAddress();

    const onSwap = useCallback(async () => {
        // @ts-ignore
        const onConfirm = (hash) => window.toastProvider.addMessage('Processing crosschain swap...', {
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

        await trade.swap({onConfirm, onApprove});

        //@ts-ignore
        window.toastProvider.addMessage('Successful crosschain swap', {
            variant: 'success',
        })
    }, [trade])

    return (
        <Card mb={3} mx={4} p={0} px={4} pb={4}>
            <Heading.h4>{trade.from.blockchain}  ➞  {trade.to.blockchain} Trade</Heading.h4>
            <Box mb={4}>
                <Box>
                    <span><b>You get:</b></span>{'  '}
                    <span>{trade.to.tokenAmount.toFormat(3)}</span>{' '}
                    <span>{trade.to.symbol}</span>
                </Box>
            </Box>
            {
                address ?  <Button onClick={onSwap}>Swap</Button> : <WalletButton />
            }

        </Card>
    )
}
