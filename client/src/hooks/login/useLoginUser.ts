import fetchAuthData from '../../utils/fetchAuthData';

async function loginUser(username: string, password: string): Promise<boolean> {
    try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const response = await fetchAuthData({
            endpoint: '/login',
            method: 'POST',
            data: formData,
            contentType: 'multipart/form-data',
        });

        console.log('Logged in:', response);
        return true; // Indicate that the login was successful
    } catch (error) {
        console.error('Login failed:', error);
        return false; // Indicate that the login was unsuccessful
    }
}

export default loginUser;
