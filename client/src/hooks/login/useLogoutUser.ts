import { useMutation } from '@tanstack/react-query';
import fetchAuthData from '../../utils/fetchAuthData';

export default function useLogoutUser() {
    const logoutUser = useMutation(async () => {
        await fetchAuthData({ endpoint: '/logout', method: 'POST' });
    });

    return { logoutUser };
}
