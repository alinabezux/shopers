import React from 'react';
import { Box } from '@mui/material';
import { Header } from './Header';
import { Footer } from './Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box sx={{ flex: 1 }}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
};

export { MainLayout };