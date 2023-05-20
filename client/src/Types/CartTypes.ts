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
    calculateTotalAmount: (cart: CartItem[]) => number;
}

export interface CartProviderProps {
    children: React.ReactNode;
}

export interface PaymentFormProps {
    totalAmount: number;
    clientSecret?: string | null;
}

export interface AddressFormProps {
    onSubmit: (data: PaymentIntentData['customer']) => void;
}

export interface UsePaymentProps {
    stripe: Stripe | null;
    elements: StripeElements | null;
}

// Customer Data Types

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
