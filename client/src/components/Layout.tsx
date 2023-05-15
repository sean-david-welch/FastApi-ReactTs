import Header from './Header';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import { LayoutProps } from '../Types/Types';

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <>
            <Header />
            <div className={isHomePage ? '' : 'container'}>{children}</div>
            <Footer />
        </>
    );
};

export default Layout;
