import { LinkProps } from 'react-router-dom';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Method } from 'axios';

// Product Types
export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

// Layout Types
export interface LayoutProps {
    children: React.ReactNode;
}

export interface NavItemProps extends LinkProps {
    children: React.ReactNode;
}

export interface NavButtonProps {
    to: string;
    children: React.ReactNode;
    icon: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface UseSideNavbar {
    isOpen: boolean;
    toggleSideNavbar: () => void;
}

// Home Types
export interface BenefitItemProps {
    icon: IconDefinition;
    title: string;
    description: string;
}

// Fetch Data Types
export interface FetchDataOptions {
    endpoint: string;
    method: Method;
    data?: any;
}
