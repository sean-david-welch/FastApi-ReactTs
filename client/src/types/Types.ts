import { LinkProps } from 'react-router-dom';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { QueryFunctionContext } from '@tanstack/react-query';
import { Method } from 'axios';

// Product Types
export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

// Fetch Data Types
export interface FetchDataOptions {
    endpoint: string;
    method: Method;
    data?: any;
}

export interface FetchAuthDataOptions extends FetchDataOptions {
    token?: string;
    contentType?: string;
}

export interface FetchProductOptions extends FetchDataOptions {
    isSingleProduct?: boolean;
}

// Login Types
export interface AuthProviderProps {
    children: React.ReactNode;
}

export interface User {
    id: string;
    username: string;
    email: string;
    is_superuser: boolean;
}

export interface AuthContextValue {
    user: User | null;
    isLoggedIn: boolean;
    loginAttempted: boolean;
    isSuperUser: boolean;
    loading: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
    setLoginAttempted: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSuperUser: React.Dispatch<React.SetStateAction<boolean>>;
    refetch: (options?: QueryFunctionContext) => Promise<unknown>;
}

export interface LoginFormProps {
    setLoggedIn: (loggedIn: boolean) => void;
}

export interface LogoutButtonProps extends LoginFormProps {
    isLoggedIn: boolean;
}

export interface CurrentUserProps {
    isLoggedIn: boolean;
    token: string;
}

// Layout Types
export interface LayoutProps {
    children: React.ReactNode;
}

export interface NavItemProps extends LinkProps {
    children: React.ReactNode;
}

export interface NavButtonProps {
    to: string | { pathname: string; state?: Record<string, any> };
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

export interface SectionHeadingProps {
    headingText: string;
    buttonLabel: string;
    buttonUrl: string;
    buttonIcon: React.ReactNode;
}

export interface CartViewProps {
    renderSectionHeading?: React.ReactNode;
}

// Cart Types
export interface CartItem extends Product {
    quantity: number;
    updated?: boolean;
}

export interface CartItemProps {
    item: CartItem;
    handleChangeQuantity: (
        id: string,
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
    handleRemove: (id: string) => void;
}

export interface CartContextData {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}

export interface CartProviderProps {
    children: React.ReactNode;
}

export interface CheckoutFormProps {
    clientSecret: string | null;
    totalAmount: number;
}
