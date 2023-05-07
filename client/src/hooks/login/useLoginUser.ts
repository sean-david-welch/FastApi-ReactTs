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
        return true;
    } catch (error) {
        console.error('Login failed:', error);
        throw new Error('Invalid username or password');
    }
}

export default loginUser;
