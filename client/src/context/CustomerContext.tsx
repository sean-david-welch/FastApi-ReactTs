import React, { createContext, useState } from 'react';
import { Customer } from '../Types/CartTypes';

interface CustomerContextProps {
    customer: Customer;
    setCustomer: React.Dispatch<React.SetStateAction<Customer>>;
}

interface CustomerProviderProps {
    children: React.ReactNode;
}

export const CustomerContext = createContext<CustomerContextProps>({
    customer: {} as Customer,
    setCustomer: () => {},
});

export const CustomerProvider: React.FC<CustomerProviderProps> = ({
    children,
}) => {
    const [customer, setCustomer] = useState<Customer>({
        name: '',
        address: {
            line1: '',
            line2: '',
            city: '',
            state: '',
            postal_code: '',
            country: '',
        },
    });

    const value: CustomerContextProps = {
        customer,
        setCustomer,
    };

    return (
        <CustomerContext.Provider value={value}>
            {children}
        </CustomerContext.Provider>
    );
};
