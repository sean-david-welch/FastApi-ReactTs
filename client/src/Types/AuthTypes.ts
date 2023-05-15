import { QueryFunctionContext } from '@tanstack/react-query';

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
