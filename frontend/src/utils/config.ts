export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const FRONTEND_BASE_URL =
    import.meta.env.VITE_FRONTEND_BASE_URL ||
    import.meta.env.VITE_FRONTEND_BASE_FALLBACK_URL;

export const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

export const AUTH0_DOMAIN = import.meta.env.VITE_FRONTEND_AUTH0_DOMAIN;
export const AUTH0_CLIENT_ID = import.meta.env.VITE_FRONTEND_AUTH0_CLIENTID;

export const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
