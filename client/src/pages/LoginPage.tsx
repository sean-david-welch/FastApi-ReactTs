import { useState } from 'react';

import Layout from '../components/Layout';
import LoginForm from '../components/login/LoginForm';
import CurrentUser from '../components/login/CurrentUser';
import LogoutButton from '../components/login/LogoutButton';

export const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    return (
        <Layout>
            <section id="login">
                {!isLoggedIn ? (
                    <LoginForm setLoggedIn={setIsLoggedIn} />
                ) : (
                    <div>
                        <CurrentUser isLoggedIn={isLoggedIn} token={''} />
                        <LogoutButton setLoggedIn={setIsLoggedIn} />
                    </div>
                )}
            </section>
        </Layout>
    );
};

export default Login;
