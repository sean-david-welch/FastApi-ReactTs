import { LinkProps } from 'react-router-dom';
import { UseMutationResult } from '@tanstack/react-query';

export interface LayoutProps {
    children: React.ReactNode;
}

export interface NavItemProps extends LinkProps {
    children: React.ReactNode;
}

export interface NavButtonProps {
    to: string | { pathname: string; state?: Record<string, any> };
    type?: 'button' | 'submit' | 'reset';
    disabled?: UseMutationResult;
    label: string;
    icon: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface UseSideNavbar {
    isOpen: boolean;
    toggleSideNavbar: () => void;
}
