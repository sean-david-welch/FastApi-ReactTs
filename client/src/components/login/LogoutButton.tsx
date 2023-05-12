import useLogoutUser from '../../hooks/login/useLogoutUser';
import NavButton from '../navigation/NavButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';

const LogoutButton: React.FC = () => {
    const { logoutUser } = useLogoutUser();

    const handleLogout = () => {
        logoutUser.mutate();
    };

    return (
        <ul className="nav-button">
            <NavButton
                to="/login"
                icon={<FontAwesomeIcon icon={faSignOut} />}
                label="Logout"
                onClick={handleLogout}
            />
        </ul>
    );
};

export default LogoutButton;
