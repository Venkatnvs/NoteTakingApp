import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Header_Nav.css';

const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };
    return (
        <header className="nav_head">
            <Link to="/" className="nav_head_title">Notes App</Link>
            <p className="my-0 text-white">Welcome, {localStorage.getItem('fullname')}</p>
            <span onClick={handleLogout} className="btn btn-danger btn-sm py-0">Logout</span>
        </header>
    );
}

export default Header;