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
                <Link className="logo" to="/">
                    <img src={logo} className="logo" id="logo" alt="Logo" />
                </Link>
                <div className="nav-list-side">
                    <ul className="nav-list">
                        <NavButton
                            to="/shop"
                            icon={<FontAwesomeIcon icon={faArrowRight} />}
                            label="Products"
                        />
                        <NavItem id="cart" aria-label="cart-nav" to="/cart">
                            <FontAwesomeIcon icon={faCartShopping} size="xl" />
                        </NavItem>
                        <NavItem id="user" aria-label="user-nav" to="/login">
                            <FontAwesomeIcon icon={faCircleUser} size="2xl" />
                        </NavItem>
                    </ul>
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;
