import Layout from '../components/Layout';
import { SignedIn, SignedOut, UserProfile } from '@clerk/clerk-react';
import { SignIn } from '@clerk/clerk-react';

export const Login = () => {
    return (
        <Layout>
            <section id="login">
                <SignedIn>
                    <UserProfile />
                </SignedIn>
                <SignedOut>
                    <SignIn />
                </SignedOut>
            </section>
        </Layout>
    );
};

export default Login;
