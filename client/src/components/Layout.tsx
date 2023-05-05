import React from 'react';

import Header from './Header';
import Footer from './Footer';

import { LayoutProps } from '../types/Types';

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default Layout;
