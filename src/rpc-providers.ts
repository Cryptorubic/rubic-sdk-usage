import { BLOCKCHAIN_NAME, Configuration } from 'rubic-sdk';

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
        },
        [BLOCKCHAIN_NAME.AVALANCHE]: {
            mainRpc: process.env.REACT_APP_AVALANCHE_RPC!!
        },
        [BLOCKCHAIN_NAME.MOONRIVER]: {
            mainRpc: process.env.REACT_APP_MOONRIVER_RPC!!
        },
        [BLOCKCHAIN_NAME.HARMONY]: {
            mainRpc: process.env.REACT_APP_HARMONY_RPC!!
        },
        [BLOCKCHAIN_NAME.FANTOM]: {
            mainRpc: process.env.REACT_APP_FANTOM_RPC!!
        }
    }
}
