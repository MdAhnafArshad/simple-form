import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Home = () => {
    return (
        <div>
            <h3>Home</h3>
            <Header/>
            <Outlet></Outlet>
        </div>
    );
};

export default Home;