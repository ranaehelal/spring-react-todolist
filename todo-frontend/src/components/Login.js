import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './reg.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setClicked(true);
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
                //to js obj
                const user = await response.json();

                // here store user data in local storage
                // why ?
                // because i want to use data until the user log out
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/home');
            } else {
                const errorMess = await response.json();
                setError(errorMess.message );
            }
        } catch (err) {
            setError( err.message);
            console.log(err);



        } finally {
            setClicked(false);
        }
    };

    return (

        <div className="register">
            <div className="login-card">
                <h2 className="register-title">Login</h2>
                <form className="register-form" onSubmit={handleSubmit}>
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
                        {clicked ? 'Loging In.' : 'Log In'}
                    </button>
                </form>

                <div className="error-message">{error}</div>

                <div className="reset-link">
                    <Link to="/forget-password">Forget Password?</Link>
                </div>


                <div className="other-link">
                    Don't have an account? <Link to="/register">Create an Account</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
