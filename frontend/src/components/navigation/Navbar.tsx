import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faCircleUser,
    faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

import logo from '../../assets/logo.png';
import useTransparentHeader from '../../hooks/navigation/useTransparentHeader';

import NavItem from './NavItem';
import NavButton from './NavButton';

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
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <NavItem to="/login">
                            <FontAwesomeIcon icon={faCircleUser} size="2xl" />
                        </NavItem>
                    </SignedOut>
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;
