import Layout from '../components/Layout';
import LoginButton from '../components/login/LoginButton';
import LogoutButton from '../components/login/LogoutButton';

export const Login = () => {
    return (
        <Layout>
            <section id="login">
                <h1>Login</h1>
                <LoginButton></LoginButton>
                <LogoutButton></LogoutButton>
            </section>
        </Layout>
    );
};

export default Login;
