import { createContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthProviderProps } from '../types/Types';
import { AuthContextValue } from '../types/Types';
import fetchAuthData from '../utils/fetchAuthData';
import LoadingSpinner from '../components/Loading';

export const AuthContext = createContext<AuthContextValue | undefined>(
    undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
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
                setIsLoggedIn(data.is_authenticated);
            },
            onError: () => {
                setIsLoggedIn(false);
            },
            retry: false,
        }
    );

    useEffect(() => {
        const checkAuthenticationStatus = async () => {
            try {
                await refetch();
            } catch (error) {
                setIsLoggedIn(false);
            }
            setLoginAttempted(true);
        };
        checkAuthenticationStatus();
    }, []);

    if (isLoggedIn === null) {
        return (
            <section id="login">
                <LoadingSpinner />
            </section>
        );
    }

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
