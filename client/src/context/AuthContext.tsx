import { createContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthProviderProps, AuthContextValue } from '../types/AuthTypes';
import fetchAuthData from '../utils/fetchAuthData';
import Loading from '../components/Loading';

export const AuthContext = createContext<AuthContextValue | undefined>(
    undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [loginAttempted, setLoginAttempted] = useState<boolean>(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSuperUser, setIsSuperUser] = useState<boolean>(false);

    const authQuery = useQuery(
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
                setUser(data.user);
                if (superUserQuery.status === 'success') {
                    setLoading(false);
                }
            },
            onError: () => {
                setIsLoggedIn(false);
            },
            retry: false,
            staleTime: 1000 * 60 * 60,
        }
    );

    const superUserQuery = useQuery(
        ['superuser'],
        async () => {
            const superUserStatus = await fetchAuthData({
                endpoint: '/is-superuser',
                method: 'GET',
            });
            return superUserStatus;
        },
        {
            enabled: loginAttempted,
            onSuccess: data => {
                setIsSuperUser(data.is_superuser);
                if (authQuery.status === 'success') {
                    setLoading(false);
                }
            },
            onError: () => {
                setIsSuperUser(false);
            },
            retry: false,
            staleTime: 1000 * 60 * 60,
        }
    );

    useEffect(() => {
        const checkAuthenticationStatus = async () => {
            try {
                await authQuery.refetch();
                await superUserQuery.refetch();
            } catch (error) {
                setIsLoggedIn(false);
                setIsSuperUser(false);
            }
            setLoginAttempted(true);
        };
        checkAuthenticationStatus();
    }, []);

    if (isLoggedIn === null) {
        return (
            <section id="login">
                <Loading />
            </section>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn,
                isSuperUser,
                loginAttempted,
                setIsLoggedIn,
                setIsSuperUser,
                setLoginAttempted,
                refetch: authQuery.refetch,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
