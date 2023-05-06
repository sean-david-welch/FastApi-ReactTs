import React, { useState } from 'react';
import loginUser from '../../hooks/login/useLoginUser';

interface LoginFormProps {
    setLoggedIn: (loggedIn: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setLoggedIn }) => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // ...
        const loggedInUser = await loginUser(username, password);
        if (loggedInUser) {
            setLoggedIn(true);
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
