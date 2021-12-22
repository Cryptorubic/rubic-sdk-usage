import React, { FunctionComponent, useState } from 'react';
import { PriceToken } from 'rubic-sdk/dist/core/blockchain/tokens/price-token';
import { PriceTokenAmount } from 'rubic-sdk/dist/core/blockchain/tokens/price-token-amount';

//@ts-ignore
import { Card, Flex, Heading, Input, Box } from 'rimble-ui';

interface IProps {
    fromToken: PriceTokenAmount | null;
    toToken: PriceToken | null;
    amount: number;
    fromAddress: string;
    toAddress: string;
    onAmountChange: (amount: number) => void;
    onFromAddressChange: (address: string) => void;
    onToAddressChange: (address: string) => void;
}

export const CommonTradeInfo: FunctionComponent<IProps> = ({
    fromToken ,
    toToken,
    amount,
    fromAddress,
    toAddress,
    onAmountChange,
    onFromAddressChange,
    onToAddressChange
   }) => {

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
                </Heading.h4>
                {toToken && <Flex alignItems="center">
                    <div>{toToken.symbol}</div>
                    { toToken.price.isFinite() && <Box ml={2}>price ${toToken.price.toFormat(2)}</Box> }
                </Flex> }
            </Card>
        </Flex>
    )
}
