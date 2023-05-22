import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faX,
    faCartShopping,
    faCircleUser,
} from '@fortawesome/free-solid-svg-icons';

import NavItem from './NavItem';
import LogoHeading from './LogoHeading';
import useSideNavbar from '../../hooks/navigation/useSideNavbar';

function SideNavbar() {
    const { isOpen, toggleSideNavbar } = useSideNavbar();

    return (
        <>
            <div className={`side-nav ${isOpen ? 'open' : 'closed'}`}>
                <nav className="side-nav__menu">
                    <LogoHeading headingText="Primal Formulas" />
                    <ul className="nav-list">
                        <NavItem to="/about">Our Story</NavItem>
                        <NavItem to="/shop">Products</NavItem>
                        <NavItem to="/login">Account</NavItem>
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
                        <FontAwesomeIcon icon={faX} className="navigation" />
                    </div>
                )}
            </div>
            {!isOpen && (
                <div className="side-nav__icon" onClick={toggleSideNavbar}>
                    <FontAwesomeIcon icon={faBars} className=" navigation" />
                </div>
            )}
        </>
    );
}

export default SideNavbar;
