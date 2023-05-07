import { useMutation } from '@tanstack/react-query';
import fetchAuthData from '../../utils/fetchAuthData';

export default function useLogoutUser(
    setLoggedIn: (loggedIn: boolean) => void
) {
    const logoutUser = useMutation(
        async () => {
            await fetchAuthData({ endpoint: '/logout', method: 'POST' });
        },
        {
            onSuccess: () => {
                setLoggedIn(false);
            },
        }
    );

    return { logoutUser };
}
