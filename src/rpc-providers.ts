import { BLOCKCHAIN_NAME } from 'rubic-sdk/dist/core/blockchain/models/BLOCKCHAIN_NAME';
import { Configuration } from 'rubic-sdk/dist/core/sdk/models/configuration';

export const configuration: Configuration = {
    rpcProviders: {
        [BLOCKCHAIN_NAME.ETHEREUM]: {
            mainRpc: process.env.REACT_APP_ETH_RPC!!
        },
        [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: {
            mainRpc: process.env.REACT_APP_BSC_RPC!!
        },
        [BLOCKCHAIN_NAME.POLYGON]: {
            mainRpc: process.env.REACT_APP_POLYGON_RPC!!
        }
    }
}
