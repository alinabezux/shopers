import React from 'react';
import { Box } from '@mui/material';
import { Header } from './Header';
import { Footer } from './Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            {/* <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                <Link style={{
                    color: "inherit",
                    undeline: "none"
                }} to="/">
                    Головна
                </Link>
                <Link style={{
                    color: "inherit",
                    undeline: "none"
                }} to="/">
                    <Typography>
                        {selectedProduct._category}
                    </Typography>
                </Link>
                {/*<Link underline="hover" color="inherit" to="/">*/}
                {/*    {selectedProduct._type}*/}
                {/*</Link>*/}
            {/* </Breadcrumbs> */} 
            <Box sx={{ flex: 1 }}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
};

export { MainLayout };