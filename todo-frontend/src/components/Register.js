import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './reg.css';

function Register() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        fetch('http://localhost:8080/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fname, lname, email, password })
        })
            .then(res => {
                if (!res.ok) throw new Error('Registration failed');
                return res.json();
            })
            .then(() => navigate('/login'))
            .catch(() => {
                setError('Failed to register user. Please try again.');
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="register">
            <div className="login-card">
                <h2 className="register-title">Sign Up</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="input">
                        <input
                            className="register-input"
                            placeholder="First Name"
                            value={fname}
                            onChange={e => setFname(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input">
                        <input
                            className="register-input"
                            placeholder="Last Name"
                            value={lname}
                            onChange={e => setLname(e.target.value)}
                            required
                        />
                    </div>
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
                        {loading ? 'loading Create Account' : 'Sign Up'}
                    </button>
                </form>

                {error && <div className="error-message">{error}</div>}

                <div className="register-link">
                    Already have an account? <Link to="/login">Sign In</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
