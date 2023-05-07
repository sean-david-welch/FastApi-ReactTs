import fetchAuthData from '../../utils/fetchAuthData';

async function getCurrentUser(token: string) {
    try {
        const response = await fetchAuthData({
            endpoint: '/users/current_user',
            method: 'GET',
            token: token,
        });

        console.log('Current user:', response);
        return response;
    } catch (error) {
        console.error('Failed to fetch current user:', error);
    }
}

export default getCurrentUser;