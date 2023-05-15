import { useState } from 'react';
import { UseSideNavbar } from '../../Types/LayoutTypes';

const useSideNavbar = (): UseSideNavbar => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleSideNavbar = () => {
        setIsOpen(!isOpen);
    };

    return { isOpen, toggleSideNavbar };
};

export default useSideNavbar;
