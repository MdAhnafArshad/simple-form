import React from 'react';
import { Link } from 'react-router-dom';
import '../component/style/Header.css'

const Header = () => {
    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            <Link to='/registerRbs'>Register RBs</Link>
        </nav>
    );
};

export default Header;