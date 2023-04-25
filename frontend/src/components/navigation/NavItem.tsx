import { Link } from 'react-router-dom';
import { NavItemProps } from '../../types/Types';

function NavItem({ to, children }: NavItemProps) {
    return (
        <li className="nav-item">
            <Link to={to}>{children}</Link>
        </li>
    );
}

export default NavItem;
