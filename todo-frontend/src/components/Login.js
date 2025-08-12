import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './reg.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const user = await response.json();
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/home');
            } else {
                const errorMess = await response.json();
                setError(errorMess.message || 'Login failed');
            }
        } catch (err) {
            setError('Error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="register">
            <div className="login-card">
                <h2 className="register-title">Login</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="input">
                        <input
                            className="register-input"
                            placeholder="Email Address"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input">
                        <input
                            className="register-input"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        disabled={loading}

                        className="register-button"
                        type="submit"
                    >
                        {loading ? 'Lodaing Log In.' : 'Log In'}
                    </button>
                </form>

                {error && <div className="error-message">{error}</div>}

                <div className="reset-link">
                    <Link to="/forget-password">Forget Password?</Link>
                </div>


                <div className="register-link">
                    Don't have an account? <Link to="/register">Create Account</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
