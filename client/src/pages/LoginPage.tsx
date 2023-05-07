import { useAuth } from '../hooks/login/useAuthContext';

import Layout from '../components/Layout';
import LoginForm from '../components/login/LoginForm';
import CurrentUser from '../components/login/CurrentUser';
import LogoutButton from '../components/login/LogoutButton';

export const Login = () => {
    const { isLoggedIn, setIsLoggedIn } = useAuth();

    return (
        <Layout>
            <section id="login">
                {!isLoggedIn ? (
                    <LoginForm />
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
