import { useContext } from 'react';
import { CustomerContext } from '../../context/CustomerContext';

export const useCustomer = () => {
    const context = useContext(CustomerContext);

    if (!context) {
        throw new Error('useCustomer must be used within a CustomerProvider');
    }

    return context;
};
