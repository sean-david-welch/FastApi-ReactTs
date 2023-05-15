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
