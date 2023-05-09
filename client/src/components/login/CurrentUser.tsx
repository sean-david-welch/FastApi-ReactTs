import { useQuery } from '@tanstack/react-query';
import { CurrentUserProps } from '../../types/Types';
import { useAuth } from '../../hooks/login/useAuthContext';
import { Link } from 'react-router-dom';
import getCurrentUser from '../../hooks/login/useCurrentUser';
import LoadingSpinner from '../Loading';
import logo from '../../assets/logo.png';

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
            <Link to="/">
                <img src={logo} id="logo" alt="Logo" />
            </Link>
            <h2 className="section-heading">
                Current User: {currentUser.full_name}
            </h2>
            <p>Username: {currentUser.username}</p>
            <p>Email: {currentUser.email}</p>
        </div>
    );
};

export default CurrentUser;
