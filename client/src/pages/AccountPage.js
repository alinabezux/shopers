import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Stack } from '@mui/material';
import { Tabs, TabList, Tab, TabPanel, } from '@mui/joy';
import { Link, useLocation, Outlet } from 'react-router-dom'
import { tabClasses } from '@mui/joy/Tab'
import { Orders, Profile, Wishlist } from '../components';
import { Chip } from '@mui/joy';

const AccountPage = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (hash) {
            setActiveTab(hash);
        }
    }, [location]);

    return (
        <Container >
            <Typography variant="h4" className='title' > МІЙ КАБІНЕТ </Typography>
            <Box sx={{
                width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column",
            }}>

                <Stack direction="row" spacing={5} justifyContent="center" width="100%" mb={2}>
                    <Typography variant='h5'>Привіт, Аліна! </Typography>
                    <Chip size="lg" variant="soft" color="success" alignItems="flex-start">
                        Бонусний рахунок : 20 грн.
                    </Chip>
                </Stack>
                <Tabs aria-label="tabs" defaultValue="profile" value={activeTab} onChange={(e, value) => setActiveTab(value)} sx={{
                    width: "100%",
                    bgcolor: 'transparent', display: "flex", alignItems: "center"
                }}>
                    <TabList
                        disableUnderline
                        sx={{
                            // variant:"neutral",
                            width: "fit-content",
                            p: 0.5,
                            gap: 1,
                            borderRadius: 'xl',
                            bgcolor: 'background.level1',
                            [`& .${tabClasses.root}[aria-selected="true"]`]: {
                                boxShadow: 'sm',
                                bgcolor: 'background.surface',
                            },
                        }}
                    >
                        <Tab disableIndicator value="profile" id="profile" sx={{ fontWeight: "500" }}>МІЙ ПРОФІЛЬ</Tab>
                        <Tab disableIndicator value="wishlist" id="wishlist" sx={{ fontWeight: "500" }}>СПИСОК БАЖАНЬ</Tab>
                        <Tab disableIndicator value="orders" id="orders" sx={{ fontWeight: "500" }}>МОЇ ЗАМОВЛЕННЯ</Tab>

                    </TabList>

                    <TabPanel value="profile">
                        <Profile />
                    </TabPanel>
                    <TabPanel value="wishlist">
                        <Wishlist />
                    </TabPanel>
                    <TabPanel value="orders">
                        <Orders />
                    </TabPanel>
                </Tabs>

            </Box>
            <Outlet />
        </Container >
    );
};

export { AccountPage };