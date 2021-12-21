import React, { useCallback } from 'react';
import { useAddress } from 'src/hooks/useAddress';
// @ts-ignore
import { MetaMaskButton } from 'rimble-ui';

export const WalletButton = () => {
    const { actions } = useAddress();

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
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        actions.setAddress(accounts[0]);
    }, [actions]);

    return <MetaMaskButton onClick={onLogin}>Connect wallet</MetaMaskButton>
}
