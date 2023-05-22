import { useState } from 'react';
import { useAuth } from '../../hooks/login/useAuthContext';
import useLoginUser from '../../hooks/login/useLoginUser';
import LogoHeading from '../navigation/LogoHeading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const { setIsLoggedIn, setLoginAttempted } = useAuth();
    const loginUserMutation = useLoginUser();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');
        loginUserMutation.mutate(
            { username, password },
            {
                onSuccess: () => {
                    setIsLoggedIn(true);
                    setLoginAttempted(true);
                },
                onError: () => {
                    setErrorMessage('Invalid username or password');
                },
            }
        );
    };

    return (
        <form id="form" onSubmit={handleSubmit}>
            <LogoHeading headingText={`Fill out the form to login:`} />

            <div className="input-box">
                <label htmlFor="username">Username/Email:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    autoComplete="username"
                />
            </div>
            <div className="input-box">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                />
            </div>
            {errorMessage && <p className="error">{errorMessage}</p>}

            <button className="btn btn-primary btn-nav" type="submit">
                Login <FontAwesomeIcon icon={faArrowRight} className="icon" />
            </button>
        </form>
    );
};

export default LoginForm;
