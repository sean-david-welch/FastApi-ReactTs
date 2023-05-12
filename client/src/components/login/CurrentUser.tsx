import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../hooks/login/useAuthContext';
import { CurrentUserProps } from '../../types/Types';
import LogoHeading from '../navigation/LogoHeading';
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
            <LogoHeading headingText={`Welcome, ${currentUser.username}`} />
            <p>Username: {currentUser.username}</p>
            <p>Email: {currentUser.email}</p>
        </div>
    );
};

export default CurrentUser;
