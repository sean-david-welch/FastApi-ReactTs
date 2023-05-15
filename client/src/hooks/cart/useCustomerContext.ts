import { useContext } from 'react';
import { CustomerContext } from '../../context/CustomerContext';

export const useCustomer = () => {
    const { customer, setCustomer } = useContext(CustomerContext);

    if (customer === undefined || typeof setCustomer !== 'function') {
        throw new Error(
            'useCustomerContext must be used within a CustomerProvider'
        );
    }
    return { customer, setCustomer };
};
