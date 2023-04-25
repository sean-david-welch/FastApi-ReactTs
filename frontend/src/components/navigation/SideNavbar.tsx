import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faX,
    faCartShopping,
    faCircleUser,
} from '@fortawesome/free-solid-svg-icons';
import useSideNavbar from '../../hooks/navigation/useSideNavbar';

import NavItem from './NavItem';

function SideNavbar() {
    const { isOpen, toggleSideNavbar } = useSideNavbar();

    return (
        <>
            <div className={`side-nav ${isOpen ? 'open' : 'closed'}`}>
                <nav className="side-nav__menu">
                    <ul>
                        <NavItem to="/about">About</NavItem>
                        <NavItem to="/shop">Products</NavItem>
                        <NavItem to="/cart">Cart</NavItem>
                        <NavItem to="/login">Login</NavItem>
                    </ul>
                    <ul className="icon-nav">
                        <NavItem to="/cart">
                            <FontAwesomeIcon icon={faCartShopping} size="lg" />
                        </NavItem>
                        <NavItem to="/login">
                            <FontAwesomeIcon icon={faCircleUser} size="xl" />
                        </NavItem>
                    </ul>
                </nav>
                {isOpen && (
                    <div className="side-nav__icon" onClick={toggleSideNavbar}>
                        <FontAwesomeIcon icon={faX} />
                        <Link to="/">
                            <p>Primal Formulas</p>
                        </Link>
                    </div>
                )}
            </div>
            {!isOpen && (
                <div className="side-nav__icon" onClick={toggleSideNavbar}>
                    <FontAwesomeIcon icon={faBars} className="fadeInOut" />
                </div>
            )}
        </>
    );
}

export default SideNavbar;
