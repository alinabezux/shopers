import React from 'react';
import { Box } from '@mui/material';
import { Header } from './Header';
import { Footer } from './Footer';
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout = () => {

    const location = useLocation();
    const isAdminPage = location.pathname.includes('/admin');

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {!isAdminPage && <Header />}
            <Box sx={{ flex: 1 }}>
                <Outlet />
            </Box>
            {!isAdminPage && <Footer />}
        </Box>
    );
};

export { MainLayout };