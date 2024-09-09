import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";

import { Orders, Profile, Wishlist } from '../components';

import { Typography, Box } from '@mui/material';
import { Tabs, TabList, Tab, TabPanel } from '@mui/joy';
import { tabClasses } from '@mui/joy/Tab'
import { Chip } from '@mui/joy';
import RedeemRoundedIcon from '@mui/icons-material/RedeemRounded';
import { useTheme, useMediaQuery } from '@mui/material';

const AccountPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const { user } = useSelector(state => state.userReducer);
    const { userId } = useSelector(state => state.authReducer);

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (hash) {
            setActiveTab(hash);
        }
    }, [location]);

    useEffect(() => {
        if (!userId) {
            navigate('/auth?expSession=true')
        }
    }, [userId, navigate])

    return (
        <Box className='accountpage'>
            <Typography variant="h5" className='title' > МІЙ КАБІНЕТ </Typography>
            <Box className='accountpage__greeting' sx={{ my: 1 }}>
                <Typography variant='h5'>Привіт, {user.name}! </Typography>
                <Chip size='lg' className='accountpage__chip' variant="soft" color="success" startDecorator={<RedeemRoundedIcon />}>
                    на бонусному рахунку : {user.bonus} грн.
                </Chip>
            </Box>

            <Tabs className='accountpage__menu tabs' aria-label="tabs" defaultValue="profile" orientation={isSmallScreen ? "vertical" : "horizontal"}
                value={activeTab} onChange={(e, value) => setActiveTab(value)}
                sx={{ my: 1 }}>
                <TabList className='accountpage__tablist'
                    disableUnderline
                    sx={{
                        mb: 1,
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

                <TabPanel className='accountpage__tabpanel' value="profile" >
                    <Profile user={user} />
                </TabPanel>
                <TabPanel className='accountpage__tabpanel' value="wishlist">
                    <Wishlist />
                </TabPanel>
                <TabPanel className='accountpage__tabpanel' value="orders">
                    <Orders />
                </TabPanel>
            </Tabs>
        </Box >
    );
};

export { AccountPage };