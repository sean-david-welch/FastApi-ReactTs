import { Method } from 'axios';
import { LinkProps } from 'react-router-dom';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { UseMutationResult } from '@tanstack/react-query';
import { QueryFunctionContext } from '@tanstack/react-query';
import { Stripe, StripeElements } from '@stripe/stripe-js';

// Product Types
export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

export interface ProductUpdate {
    name: string;
    price: number;
    description: string;
    image: string;
}

export interface ProductDetailProps {
    product: Product | null;
    loading: boolean;
    handleAddToCart: () => void;
    isLoggedIn: boolean;
    isSuperUser: boolean;
}

export interface ProductFormProps {
    product: Product;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    operation: string;
}

export interface ProductFormFieldsProps {
    name: string;
    value: string | number;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ProductUpdateFormProps {
    initialProduct: Product;
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

// Home Types
export interface BenefitItemProps {
    icon: IconDefinition;
    title: string;
    description: string;
}

export interface SectionHeadingProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    headingText: string;
    buttonLabel: string;
    buttonUrl: string;
    buttonIcon: React.ReactNode;
}

export interface LogoHeadingProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    headingText: string;
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
    email: string;
    address: Address;
    totalAmount: number;
    clientSecret: string | null;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setAddress: React.Dispatch<React.SetStateAction<Address>>;
    addressFormSubmitted: boolean;
    setAddressFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PaymentFormProps {
    isLoading: boolean;
    totalAmount: number;
    stripe: Stripe | null;
    elements: StripeElements | null;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface UsePaymentProps {
    stripe: Stripe | null;
    elements: StripeElements | null;
    clientSecret: string | null;
    email: string;
    address: Address;
    setEmail: (email: string) => void;
    setAddress: (address: Address) => void;
}

export interface Address {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
}

export interface CustomerDataProps {
    name: string;
    email: string;
    phone: string;
    address: Address;
}

// About types
export interface InfoItemProps {
    image: string;
    title: string;
    description: string;
}
