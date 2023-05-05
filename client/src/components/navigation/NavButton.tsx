import { Link } from 'react-router-dom';
import { NavButtonProps } from '../../types/Types';

function NavButton({ to, children, icon, onClick }: NavButtonProps) {
    return (
        <li className="nav-button">
            <button className="btn btn-nav btn-primary" onClick={onClick}>
                <Link to={to}>
                    {children} {icon}
                </Link>
            </button>
        </li>
    );
}

export default NavButton;
