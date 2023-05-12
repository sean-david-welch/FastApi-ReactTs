import { Link } from 'react-router-dom';
import { NavButtonProps } from '../../types/Types';

function NavButton({ to, label, icon, onClick }: NavButtonProps) {
    return (
        <>
            <li className="nav-button">
                <Link to={to}>
                    <button
                        className="btn btn-nav btn-primary"
                        onClick={onClick}
                    >
                        {label} <i className="icon">{icon}</i>
                    </button>
                </Link>
            </li>
        </>
    );
}

export default NavButton;
