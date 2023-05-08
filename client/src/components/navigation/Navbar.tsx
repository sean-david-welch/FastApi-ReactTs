import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faCircleUser,
    faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

import NavItem from './NavItem';
import NavButton from './NavButton';
import logo from '../../assets/logo.png';
import useTransparentHeader from '../../hooks/navigation/useTransparentHeader';

function Navbar() {
    const isTransparent = useTransparentHeader();

    return (
        <nav id="navbar" className={isTransparent ? 'transparent' : ''}>
            <ul className="nav-list">
                <Link to="/">
                    <img src={logo} id="logo" alt="Logo" />
                </Link>
                <div className="nav-list-side">
                    <NavButton
                        to="/shop"
                        icon={
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                className="icon"
                            />
                        }
                    >
                        Products
                    </NavButton>
                    <NavItem to="/cart">
                        <FontAwesomeIcon icon={faCartShopping} size="xl" />
                    </NavItem>
                    <NavItem to="/login">
                        <FontAwesomeIcon icon={faCircleUser} size="2xl" />
                    </NavItem>
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;
