import useLogoutUser from '../../hooks/login/useLogoutUser';
import { LoginFormProps } from '../../types/Types';

const LogoutButton: React.FC<LoginFormProps> = ({ setLoggedIn }) => {
    const { logoutUser } = useLogoutUser(setLoggedIn);

    const handleLogout = () => {
        logoutUser.mutate();
    };

    return (
        <button className="btn btn-primary btn-nav" onClick={handleLogout}>
            Log out
        </button>
    );
};

export default LogoutButton;
