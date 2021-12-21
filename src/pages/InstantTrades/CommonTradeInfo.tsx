import { FunctionComponent } from 'react';
import { PriceToken } from 'rubic-sdk/dist/core/blockchain/tokens/price-token';
import { PriceTokenAmount } from 'rubic-sdk/dist/core/blockchain/tokens/price-token-amount';

//@ts-ignore
import { Card, Flex, Heading } from 'rimble-ui';

interface IProps {
    fromToken: PriceTokenAmount;
    toToken: PriceToken;
}

export const CommonTradeInfo: FunctionComponent<IProps> = ({ fromToken , toToken}) => {
    return(
        <Flex mx={4} mb={4}>
            <Card p={3} width={1 / 2} color="white" bg="#383636">
                <Heading.h4 mt={2} mb={3}>From</Heading.h4>
                <div>{fromToken.tokenAmount.toFormat(3) + ' ' + fromToken.symbol}</div>
                <div>address {fromToken.address}</div>
                { fromToken.price.isFinite() && <div>price ${fromToken.price.toFormat(2)}</div> }
            </Card>
            <Card p={3} width={1 / 2} color="white" bg="#383636">
                <Heading.h4 mt={2} mb={3}>To</Heading.h4>
                <div>{toToken.symbol}</div>
                <div>address {toToken.address}</div>
                { toToken.price.isFinite() && <div>price ${toToken.price.toFormat(2)}</div> }
            </Card>
        </Flex>
    )
}
