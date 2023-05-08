import { createContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthProviderProps } from '../types/Types';
import { AuthContextValue } from '../types/Types';
import fetchAuthData from '../utils/fetchAuthData';

export const AuthContext = createContext<AuthContextValue | undefined>(
    undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loginAttempted, setLoginAttempted] = useState<boolean>(false);

    const { refetch } = useQuery(
        ['auth'],
        async () => {
            const isAuthenticated = await fetchAuthData({
                endpoint: '/is-authenticated',
                method: 'GET',
            });
            return isAuthenticated;
        },
        {
            enabled: loginAttempted,
            onSuccess: data => {
                setIsLoggedIn(data);
            },
            onError: () => {
                setIsLoggedIn(false);
            },
            retry: false,
        }
    );

    useEffect(() => {
        if (!loginAttempted) {
            setLoginAttempted(true);
            refetch();
        }
    }, [loginAttempted, refetch]);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                loginAttempted,
                setLoginAttempted,
                refetch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
