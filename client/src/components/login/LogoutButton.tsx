import useLogoutUser from '../../hooks/login/useLogoutUser';
import { LoginFormProps } from '../../types/Types';

const LogoutButton: React.FC<LoginFormProps> = ({ setLoggedIn }) => {
    const { logoutUser } = useLogoutUser();

    const handleLogout = () => {
        logoutUser.mutate();
        setLoggedIn(false);
    };

    return <button onClick={handleLogout}>Log out</button>;
};

export default LogoutButton;
