import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Header } from './Header';
import { Footer } from './Footer';

import { Box } from '@mui/material';

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