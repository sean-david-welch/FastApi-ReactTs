import { useMutation } from '@tanstack/react-query';
import fetchAuthData from '../../utils/fetchAuthData';
import { useAuth } from './useAuthContext';

export default function useLogoutUser() {
    const { setIsLoggedIn } = useAuth();

    const logoutUser = useMutation(
        async () => {
            await fetchAuthData({ endpoint: '/logout', method: 'POST' });
        },
        {
            onSuccess: () => {
                setIsLoggedIn(false);
            },
        }
    );

    return { logoutUser };
}
