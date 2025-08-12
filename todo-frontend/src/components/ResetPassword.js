import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || '';

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleReset = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await axios.put('http://localhost:8080/api/users/forget-password', {
                email,
                newPassword: password,
            });
            navigate('/login');
        } catch (err) {
            setError('Error resetting password');
            console.error(err);
        }
    };

    return (
        <div className="register">
            <div className="login-card">
                <h2 className="register-title">Reset Password</h2>
                <form className="register-form" onSubmit={handleReset}>
                    <input
                        type="password"
                        placeholder="New Password"
                        className="register-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="register-input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="register-button">Reset</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
}
