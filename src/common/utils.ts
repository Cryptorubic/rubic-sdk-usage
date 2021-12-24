import { Web3Pure } from 'rubic-sdk';

export const validateAddressesObjects = (addresses: {address: string}[] | {address: string}) => {
    if (Array.isArray(addresses)) {
        return addresses.every(item => Web3Pure.isAddressCorrect(item.address));
    }
    return Web3Pure.isAddressCorrect(addresses.address);
}

export const validateAddresses = (addresses: string[] | string) => {
    if (Array.isArray(addresses)) {
        return addresses.every(address => Web3Pure.isAddressCorrect(address));
    }
    return Web3Pure.isAddressCorrect(addresses);
}
