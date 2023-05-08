import { useQuery } from '@tanstack/react-query';
import { CurrentUserProps } from '../../types/Types';
import { useAuth } from '../../hooks/login/useAuthContext';
import getCurrentUser from '../../hooks/login/useCurrentUser';
import LoadingSpinner from '../Loading';

const CurrentUser: React.FC<CurrentUserProps> = ({ token }) => {
    const { isLoggedIn, loginAttempted } = useAuth();

    const {
        data: currentUser,
        isLoading,
        error,
    } = useQuery(['currentUser', token], () => getCurrentUser(token), {
        enabled: isLoggedIn && loginAttempted,
        retry: false,
    });

    if (!isLoggedIn) {
        return null;
    }

    if (isLoading) {
        return (
            <div id="login">
                <LoadingSpinner />
            </div>
        );
    }

    if (error || !currentUser) {
        return <div>Error fetching current user</div>;
    }

    return (
        <div className="current-user">
            <h1>Current User: {currentUser.full_name}</h1>
            <p>Username: {currentUser.username}</p>
            <p>Email: {currentUser.email}</p>
        </div>
    );
};

export default CurrentUser;
