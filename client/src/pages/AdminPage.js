import React from 'react';
import Sidebar from '../components/Admin/Sidebar';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import OrderTable from '../components/Admin/OrderTable';
import Button from '@mui/joy/Button';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { Outlet } from 'react-router-dom';

const AdminPage = () => {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <Box
                component="main"
                className="MainContent"
                sx={{
                    px: { xs: 2, md: 6 },
                    pt: {
                        xs: 'calc(12px + var(--Header-height))',
                        sm: 'calc(12px + var(--Header-height))',
                        md: 3,
                    },
                    pb: { xs: 2, sm: 2, md: 3 },
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0,
                    height: '100dvh',
                    gap: 1,
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export { AdminPage };