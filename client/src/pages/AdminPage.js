import React from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../components/Admin/Sidebar';

import Box from '@mui/joy/Box';
import { useMediaQuery } from '@mui/material';
import { Alert, Stack, Typography } from '@mui/joy';


const AdminPage = () => {
    const isLargeScreen = useMediaQuery('(min-width:1025px)');

    return (
        <Box sx={{ display: 'flex', maxHeight: '100vh', position: 'relative' }}>
            {
                isLargeScreen ? (
                    <>
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
                    </>
                ) :
                    (
                        <Box
                            sx={{
                                display: 'flex',
                                width: "100vw",
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100vh',
                                textAlign: 'center',
                            }}
                        >
                            <Alert color="danger">
                                <Stack direction="column" alignItems="center" justifyContent="center">
                                    <Typography level="title-lg"><b>Ця сторінка доступна лише на великих екранах.</b></Typography>
                                    <br />
                                    <Typography level="body-md">
                                        Будь ласка, використовуйте пристрій з шириною екрану більше ніж 1024px.
                                    </Typography>
                                </Stack>
                            </Alert>
                        </Box>
                    )
            }
        </Box >
    );
};

export { AdminPage };