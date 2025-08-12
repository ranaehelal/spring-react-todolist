import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import ForgetPasswordEmail from './components/ForgetPasswordEmail';
import ResetPassword from './components/ResetPassword';
import Header from "./components/header";

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Login />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/forget-password" element={<ForgetPasswordEmail />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
