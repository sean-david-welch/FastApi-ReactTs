import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    const {
        isLoggedIn,
        isSuperUser,
        loginAttempted,
        setIsLoggedIn,
        setLoginAttempted,
        setIsSuperUser,
    } = context;

    return {
        isLoggedIn,
        isSuperUser,
        loginAttempted,
        setIsLoggedIn,
        setLoginAttempted,
        setIsSuperUser,
    };
};
