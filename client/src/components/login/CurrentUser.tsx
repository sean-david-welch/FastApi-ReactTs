import React, { useEffect, useState } from 'react';
import getCurrentUser from '../../hooks/login/useCurrentUser';

interface CurrentUserProps {
    isLoggedIn: boolean;
}

const CurrentUser: React.FC<CurrentUserProps> = ({ isLoggedIn }) => {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const user = await getCurrentUser();
                setCurrentUser(user);
            } catch (error) {
                console.error('Failed to fetch current user:', error);
            } finally {
                setLoading(false);
            }
        };

        if (isLoggedIn) {
            fetchCurrentUser();
        }
    }, [isLoggedIn]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!currentUser) {
        return <div>Error fetching current user</div>;
    }

    return (
        <div>
            <h1>Current User</h1>
            <p>Username: {currentUser.username}</p>
            {/* Display other user properties here */}
        </div>
    );
};

export default CurrentUser;
