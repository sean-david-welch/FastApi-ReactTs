import { useState } from 'react';

import Layout from '../components/Layout';
import LoginForm from '../components/login/LoginForm';
import CurrentUser from '../components/login/CurrentUser';

export const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    return (
        <Layout>
            <section id="login">
                <LoginForm setLoggedIn={setIsLoggedIn} />
                <CurrentUser isLoggedIn={isLoggedIn} />
            </section>
        </Layout>
    );
};

export default Login;
