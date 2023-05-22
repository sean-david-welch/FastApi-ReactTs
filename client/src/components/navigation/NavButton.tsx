import { useNavigate } from 'react-router-dom';
import { NavButtonProps } from '../../types/LayoutTypes';

function NavButton({ to, label, icon, onClick }: NavButtonProps) {
    const navigate = useNavigate();

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(event);
        }
        navigate(to);
    };

    return (
        <>
            <li className="nav-button">
                <button
                    className="btn btn-nav btn-primary"
                    onClick={handleClick}
                >
                    {label} <i className="icon">{icon}</i>
                </button>
            </li>
        </>
    );
}

export default NavButton;
