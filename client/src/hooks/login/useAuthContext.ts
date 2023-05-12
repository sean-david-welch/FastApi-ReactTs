import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    const { user, isLoggedIn, setIsLoggedIn, loginAttempted } = context;
    const isSuperUser = user && user.is_superuser;

    return { user, isLoggedIn, setIsLoggedIn, isSuperUser, loginAttempted };
};
