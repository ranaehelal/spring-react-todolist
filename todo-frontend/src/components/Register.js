import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './reg.css';

function Register() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(evt) => {
        evt.preventDefault();
        setClicked(true);

        try {
            const res = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fname, lname, email, password })
            });

            if (!res.ok) throw new Error('Registration failed');
            navigate('/login');
        } catch (err) {
            //when using same email
            setError(err.message);
            console.log(err);
        } finally {
            setClicked(false);
        }
    };

    return (
        <div className="register">
            <div className="login-card">
                <h2 className="register-title">Sign Up</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <input
                        className="register-input"
                        placeholder="First Name"
                        value={fname}
                        onChange={e => setFname(e.target.value)}
                        required
                    />
                    <input
                        className="register-input"
                        placeholder="Last Name"
                        value={lname}
                        onChange={e => setLname(e.target.value)}
                        required
                    />
                    <input
                        className="register-input"
                        placeholder="Email Address"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className="register-input"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button
                        disabled={clicked}
                        className="register-button"
                        type="submit"
                    >
                        {clicked ? 'Creating Account' : 'Sign Up'}
                    </button>
                </form>
                <div className="error-message">{error}</div>
                <div className="other-link">
                    Already have an account? <Link to="/login">Sign In</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
