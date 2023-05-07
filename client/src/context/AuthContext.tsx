import { createContext, useContext, useState, useEffect } from 'react';
import { AuthProviderProps } from '../types/Types';
import fetchAuthData from '../utils/fetchAuthData';

interface AuthContextValue {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    loginAttempted: boolean;
    setLoginAttempted: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

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
