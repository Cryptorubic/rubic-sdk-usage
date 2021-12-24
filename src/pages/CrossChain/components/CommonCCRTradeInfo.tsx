import { BigNumber } from 'bignumber.js';
import React, { FunctionComponent, useMemo, useState } from 'react';


//@ts-ignore
import { Card, Flex, Heading, Input, Box, Select } from 'rimble-ui';
import { BLOCKCHAIN_NAME, MAINNET_BLOCKCHAIN_NAME, PriceToken, PriceTokenAmount } from 'rubic-sdk';

import { validateAddresses } from 'src/common/utils';
import { useRubicSdk } from 'src/hooks/useRubicSdk';
import useAsyncEffect from 'use-async-effect';

interface IProps {
    amount: number;
    fromAddress: string;
    toAddress: string;
    fromBlockchain: BLOCKCHAIN_NAME,
    toBlockchain: BLOCKCHAIN_NAME,
    onFromBlockchainChange: (blockchain: MAINNET_BLOCKCHAIN_NAME) => void;
    onToBlockchainChange: (blockchain: MAINNET_BLOCKCHAIN_NAME) => void;
    onAmountChange: (amount: number) => void;
    onFromAddressChange: (address: string) => void;
    onToAddressChange: (address: string) => void;
}

export const CommonCCRTradeInfo: FunctionComponent<IProps> = ({
    amount,
    fromAddress,
    toAddress,
    fromBlockchain,
    toBlockchain,
    onFromBlockchainChange,
    onToBlockchainChange,
    onAmountChange,
    onFromAddressChange,
    onToAddressChange
   }) => {

    const { sdk } = useRubicSdk();

    const [fromToken, setFromToken] = useState<PriceTokenAmount | null>(null);

    const [toToken, setToToken] = useState<PriceToken | null>(null);

    const options = useMemo(() => Object.values(MAINNET_BLOCKCHAIN_NAME).map(value => ({ value, label: value })), []);

    useAsyncEffect(async () => {
        if (!validateAddresses(fromAddress) || !sdk) {
            setFromToken(null);
            return;
        }
        const from = await sdk.tokens.createPriceTokenAmount(
            { blockchain: fromBlockchain, address: fromAddress, tokenAmount: new BigNumber(amount)}
        );
        setFromToken(from);
    }, [setFromToken, fromAddress, fromBlockchain, amount]);

    useAsyncEffect(async () => {
        if (!validateAddresses(toAddress) || !sdk) {
            setToToken(null);
            return;
        }
        const to = await sdk.tokens.createPriceToken(
            { blockchain: toBlockchain, address: toAddress}
        );
        setToToken(to);
    }, [setToToken, toAddress, toBlockchain]);

    return(
        <Flex mx={4} mb={4}>
            <Card p={3} width={1 / 2} color="white" bg="#383636">
                <Heading.h4 mt={2} mb={3}>
                    From
                    <Input
                        type="text"
                        ml={2}
                        required={true}
                        value={fromAddress}
                        height="1rem"
                        width="500px"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFromAddressChange(e.target.value)}
                    />
                    <Select
                        ml={2}
                        required={true}
                        options={options}
                        value={fromBlockchain}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFromBlockchainChange(e.target.value as MAINNET_BLOCKCHAIN_NAME)}
                    />
                </Heading.h4>
                <Flex alignItems="center">
                    <Input
                        type="number"
                        mr={2}
                        required={true}
                        value={amount}
                        height="1rem"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onAmountChange(parseFloat(e.target.value))}
                    />
                    {fromToken && <>
                        <div>{fromToken.symbol}</div>
                        {fromToken.price.isFinite() && <Box ml={3}>(price ${fromToken.price.toFormat(2)})</Box>}
                    </>}
                </Flex>
            </Card>
            <Card p={3} width={1 / 2} color="white" bg="#383636">
                <Heading.h4 mt={2} mb={3}>
                    To
                    <Input
                        type="text"
                        ml={2}
                        required={true}
                        value={toAddress}
                        height="1rem"
                        width="500px"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onToAddressChange(e.target.value)}
                    />
                    <Select
                        ml={2}
                        required={true}
                        options={options}
                        value={toBlockchain}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onToBlockchainChange(e.target.value as MAINNET_BLOCKCHAIN_NAME)}
                    />
                </Heading.h4>
                {toToken && <Flex alignItems="center">
                    <div>{toToken.symbol}</div>
                    { toToken.price.isFinite() && <Box ml={2}>price ${toToken.price.toFormat(2)}</Box> }
                </Flex> }
            </Card>
        </Flex>
    )
}
