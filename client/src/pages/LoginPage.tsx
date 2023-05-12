import { useAuth } from '../hooks/login/useAuthContext';

import Layout from '../components/Layout';
import LoginForm from '../components/login/LoginForm';
import CurrentUser from '../components/login/CurrentUser';
import SectionHeading from '../components/navigation/SectionHeading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export const Login = () => {
    const { isLoggedIn } = useAuth();

    return (
        <Layout>
            <section id="login">
                <SectionHeading
                    headingText="Primal Formulas Login"
                    buttonLabel="Continue Shopping"
                    buttonUrl="/Shop"
                    buttonIcon={
                        <FontAwesomeIcon icon={faArrowRight} className="icon" />
                    }
                />
                {isLoggedIn === false ? (
                    <LoginForm />
                ) : (
                    <CurrentUser isLoggedIn={isLoggedIn} token={''} />
                )}
            </section>
        </Layout>
    );
};

export default Login;
