import React from 'react';
import getCurrentUser from '../../hooks/login/useCurrentUser';
import { useQuery } from '@tanstack/react-query';
import { CurrentUserProps } from '../../types/Types';
import LoadingSpinner from '../Loading';

const CurrentUser: React.FC<CurrentUserProps> = ({
    isLoggedIn,
    token,
    attemptedLogin,
}) => {
    const {
        data: currentUser,
        isLoading,
        error,
    } = useQuery(['currentUser', token], () => getCurrentUser(token), {
        enabled: isLoggedIn && attemptedLogin,
        retry: false,
    });

    if (isLoading && attemptedLogin) {
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
        <div>
            <h1>Current User</h1>
            <p>Username: {currentUser.username}</p>
        </div>
    );
};

export default CurrentUser;
