import { createContext, useState, useEffect } from 'react';
import { AuthProviderProps } from '../types/Types';
import { AuthContextValue } from '../types/Types';
import fetchAuthData from '../utils/fetchAuthData';

export const AuthContext = createContext<AuthContextValue | undefined>(
    undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loginAttempted, setLoginAttempted] = useState<boolean>(false);

    useEffect(() => {
        if (loginAttempted) {
            checkAuthStatus();
        }
    }, [loginAttempted]);

    const checkAuthStatus = async () => {
        try {
            const isAuthenticated = await fetchAuthData({
                endpoint: '/is-authenticated',
                method: 'GET',
            });
            setIsLoggedIn(isAuthenticated);
        } catch (error) {
            setIsLoggedIn(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                loginAttempted,
                setLoginAttempted,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
