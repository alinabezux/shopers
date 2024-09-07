import React from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../components/Admin/Sidebar';

import Box from '@mui/joy/Box';

const AdminPage = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '100vh', position: 'relative' }}>
            <Sidebar />
            <Box
                sx={{
                    px: { xs: 2, md: 6 },
                    pt: {
                        xs: 'calc(12px + var(--Header-height))',
                        sm: 'calc(12px + var(--Header-height))',
                        md: 3,
                    },
                    pb: { xs: 2, sm: 2, md: 3 },
                    boxSizing: "border-box",
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                    position: "absolute",
                    gap: 1,
                    left: "var(--Sidebar-width)",
                    right: 0
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export { AdminPage };