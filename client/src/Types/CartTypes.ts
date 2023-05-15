import { Product } from './ProductTypes';
import { Stripe, StripeElements } from '@stripe/stripe-js';

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
    totalAmount: number;
    clientSecret: string | null;
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
}

export interface Address {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
}

export interface Customer {
    name: string;
    email: string;
    address: Address;
}

export interface PaymentIntentData {
    cart: CartItem[];
    customer: Customer;
    receipt_email: Customer['email'];
}