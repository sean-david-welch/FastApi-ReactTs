import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faCircleUser,
    faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

import NavItem from './NavItem';
import Loading from '../Loading';
import NavButton from './NavButton';
import useTransparentHeader from '../../hooks/navigation/useTransparentHeader';
import fetchStaticContent from '../../utils/fetchStaticContent';

function Navbar() {
    const isTransparent = useTransparentHeader();
    const logoQuery = useQuery(['logo.png'], () => fetchStaticContent('logo'));

    if (logoQuery.isLoading) {
        return <Loading />;
    }

    if (logoQuery.isError && logoQuery.error instanceof Error) {
        return <div>Error: {logoQuery.error.message}</div>;
    }

    const logo = logoQuery.data?.content;

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
