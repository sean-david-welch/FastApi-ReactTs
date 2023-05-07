import getCurrentUser from '../../hooks/login/useCurrentUser';
import { useQuery } from '@tanstack/react-query';
import { CurrentUserProps } from '../../types/Types';
import LoadingSpinner from '../Loading';
import { useAuth } from '../../hooks/login/useAuthContext';

const CurrentUser: React.FC<CurrentUserProps> = ({ token }) => {
    const { loginAttempted } = useAuth();

    const {
        data: currentUser,
        isLoading,
        error,
    } = useQuery(['currentUser', token], () => getCurrentUser(token), {
        enabled: loginAttempted,
        retry: false,
    });

    if (isLoading) {
        return (
            <div>
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
