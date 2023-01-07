import React from 'react';
import { ToastContainer } from 'react-toastify';
import Routers from '../routers/routes';
import Header from './header';

const Layout = () => {
    return (
        <>
            <ToastContainer position="bottom-right" autoClose={1500} />
            <Header />
            <Routers />
        </>
    );
};

export default Layout;