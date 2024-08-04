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
        <Box sx={{ display: 'flex', maxHeight: '100vh' }}>
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
                    // flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                    // width: "100%",
                    gap: 1,
                    position: "absolute",
                    left: "var(--Sidebar-width)"
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export { AdminPage };