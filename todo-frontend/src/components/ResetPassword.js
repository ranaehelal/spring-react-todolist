import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
    const location = useLocation();
    const email = location.state?.email || '';

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/users/forget-password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, newPassword: password }),
            });

            if (!response.ok) {
                throw new Error('Error while resetting password');
            }
            navigate('/login');
        } catch (err) {
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
                    <p className="error-message">{error}</p>
                </form>
            </div>
        </div>
    );
}
