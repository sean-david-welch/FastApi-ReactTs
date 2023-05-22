import { useMutation } from '@tanstack/react-query';
import fetchAuthData from '../../utils/fetchAuthData';

interface LoginUserArgs {
    username: string;
    password: string;
}

async function loginUser(username: string, password: string): Promise<boolean> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetchAuthData({
        endpoint: '/login',
        method: 'POST',
        data: formData,
        contentType: 'multipart/form-data',
    });

    return response;
}

export default function useLoginUser() {
    return useMutation<boolean, Error, LoginUserArgs>(
        ({ username, password }) => loginUser(username, password),
        {
            onError: error => {
                console.error('Login failed:', error);
                throw new Error('Invalid username or password');
            },
        }
    );
}
