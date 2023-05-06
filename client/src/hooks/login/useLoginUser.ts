import fetchData from '../../utils/fetchData';

async function loginUser(username: string, password: string): Promise<boolean> {
    try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const response = await fetchData(
            {
                endpoint: '/login',
                method: 'POST',
                data: formData,
            },
            undefined,
            'multipart/form-data'
        );

        console.log('Logged in:', response);
        return true; // Indicate that the login was successful
    } catch (error) {
        console.error('Login failed:', error);
        return false; // Indicate that the login was unsuccessful
    }
}

export default loginUser;
