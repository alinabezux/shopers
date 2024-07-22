import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Stack } from '@mui/material';
import { Tabs, TabList, Tab, TabPanel, Button, } from '@mui/joy';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom'
import { tabClasses } from '@mui/joy/Tab'
import { Orders, Profile, Wishlist } from '../components';
import { Chip } from '@mui/joy';
import { useSelector, useDispatch } from "react-redux";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { authActions } from '../redux';
import RedeemRoundedIcon from '@mui/icons-material/RedeemRounded';
import { useTheme, useMediaQuery } from '@mui/material';

const AccountPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('profile');
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const { user } = useSelector(state => state.userReducer);
    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (hash) {
            setActiveTab(hash);
        }
    }, [location]);

    const handleLogOut = async () => {
        await dispatch(authActions.logOut())
        navigate('/')
        window.location.reload()
    };

    return (
        <Box className='accountpage'>
            <Typography variant="h4" className='title' > МІЙ КАБІНЕТ </Typography>
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

                <TabPanel value="profile">
                    <Profile user={user} />
                </TabPanel>
                <TabPanel value="wishlist">
                    <Wishlist />
                </TabPanel>
                <TabPanel value="orders">
                    <Orders />
                </TabPanel>
            </Tabs>

            <Button variant="soft" color="danger" onClick={handleLogOut} startDecorator={<LogoutRoundedIcon />}>ВИЙТИ</Button>

        </Box >
    );
};

export { AccountPage };