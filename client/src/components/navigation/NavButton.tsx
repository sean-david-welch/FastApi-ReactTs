import { Link } from 'react-router-dom';
import { NavButtonProps } from '../../Types/LayoutTypes';

function NavButton({ to, label, icon, onClick }: NavButtonProps) {
    return (
        <>
            <li className="nav-button">
                {onClick ? (
                    <button
                        className="btn btn-nav btn-primary"
                        onClick={onClick}
                    >
                        {label} <i className="icon">{icon}</i>
                    </button>
                ) : (
                    <Link to={to} className="btn btn-nav btn-primary">
                        {label} <i className="icon">{icon}</i>
                    </Link>
                )}
            </li>
        </>
    );
}

export default NavButton;
