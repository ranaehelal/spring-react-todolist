import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import './header.css';

function header() {
    return (
        <header className="head">
            <Link to="/home">
                <img src={logo} alt="Logo" className="header-logo" />
            </Link>
        </header>
    );
}

export default header;
