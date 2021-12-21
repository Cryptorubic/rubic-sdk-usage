import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { WalletButton } from 'src/components/WalletButton';
import { useAddress } from 'src/hooks/useAddress';

// @ts-ignore
import { Box, EthAddress } from 'rimble-ui';

export const Header = () => {
    const { state: address, actions } = useAddress();

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
    }, [actions])

    return (
        <Box mx={4}>
            <Box mb={3}>
                <nav className={'header-nav'}>
                    <ul>
                        <li>
                            <NavLink to="/" className={({ isActive }) => (isActive ? 'active-nav-link' : '')}>Instant Trades</NavLink>
                        </li>
                        <li>
                            <NavLink to="/crosschain" className={({ isActive }) => (isActive ? 'active-nav-link' : '')}>Cross Chain</NavLink>
                        </li>
                    </ul>
                </nav>
            </Box>
            <Box display="flex" justifyContent="flex-end">
            {
                address ?
                    <EthAddress address={address} /> :
                    <WalletButton />
            }
            </Box>
        </Box>
    )
}
