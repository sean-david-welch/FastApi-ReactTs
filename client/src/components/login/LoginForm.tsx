import { useState } from 'react';
import { useAuth } from '../../hooks/login/useAuthContext';
import loginUser from '../../hooks/login/useLoginUser';

const LoginForm: React.FC = () => {
    const { setIsLoggedIn, setLoginAttempted } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoginAttempted(true);
        const loggedInUser = await loginUser(username, password);
        if (loggedInUser) {
            setIsLoggedIn(true);
        }
    };
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form id="form" onSubmit={handleSubmit}>
            <div className="input-box">
                <label htmlFor="username">Username:</label>
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
            <button className="btn btn-primary btn-nav" type="submit">
                Login
            </button>
        </form>
    );
};

export default LoginForm;
