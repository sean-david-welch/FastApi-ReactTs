import fetchData from '../../utils/fetchData';

async function getCurrentUser() {
    try {
        const response = await fetchData({
            endpoint: '/users/current_user',
            method: 'GET',
        });

        console.log('Current user:', response);
        return response;
    } catch (error) {
        console.error('Failed to fetch current user:', error);
    }
}

export default getCurrentUser;
