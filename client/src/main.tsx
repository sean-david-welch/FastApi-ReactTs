import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ClerkProvider } from '@clerk/clerk-react';
import { CLERK_PUBLISHABLE_KEY } from './utils/config';
import './styles/App.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ClerkProvider>
);
