import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgetPasswordEmail() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleNext = (e) => {
        e.preventDefault();
        navigate('/reset-password', { state: { email } });
    };

    return (
        <div className="register">
            <div className="login-card">
                <h2 className="register-title">Forget Password</h2>
                <form className="register-form" onSubmit={handleNext}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="register-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="register-button">Recover password</button>
                </form>
            </div>
        </div>
    );
}
