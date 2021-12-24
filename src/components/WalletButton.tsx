import React, { useCallback } from 'react';
import { WalletProvider } from 'rubic-sdk/lib/core/sdk/models/configuration';
import { useAddress } from 'src/hooks/useAddress';
// @ts-ignore
import { MetaMaskButton } from 'rimble-ui';
import { useRubicSdk } from 'src/hooks/useRubicSdk';
import { configuration } from 'src/rpc-providers';

export const WalletButton = () => {
    const { actions } = useAddress();
    const { setConfiguration } = useRubicSdk();

    const onLogin = useCallback(async () => {
        // @ts-ignore
        if (typeof window.ethereum === 'undefined') {
            // @ts-ignore
            window.toastProvider.addMessage('Metamask is not installed', {
                variant: 'failure'
            });
            return;
        }

        // @ts-ignore
        const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // @ts-ignore
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        const walletProvider: WalletProvider = {
            address: accounts[0],
            chainId,
            //@ts-ignore
            core: window.ethereum
        }

        setConfiguration({...configuration, walletProvider});

        actions.setAddress(accounts[0]);
    }, [actions]);

    return <MetaMaskButton onClick={onLogin}>Connect wallet</MetaMaskButton>
}
