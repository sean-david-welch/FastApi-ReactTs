import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useTransparentHeader() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const [isTransparent, setIsTransparent] = useState(isHomePage);

    useEffect(() => {
        const handleScroll = () => {
            if (isHomePage) {
                const heroImageHeight = 250;
                const showTransparent = window.scrollY < heroImageHeight;
                setIsTransparent(showTransparent);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHomePage]);
    return isTransparent;
}

export default useTransparentHeader;
