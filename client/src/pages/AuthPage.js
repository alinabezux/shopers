import React, { useEffect, useState } from 'react';
import { Typography, Stack, Box } from "@mui/material";
import { Tabs, TabList, Tab, TabPanel } from '@mui/joy';
import { useLocation } from 'react-router-dom'
import { tabClasses } from '@mui/joy/Tab'
import image from '../assets/loginpage.jpg'

import Snackbar from '@mui/joy/Snackbar';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

import { LogIn, Register } from '../components';

const AuthPage = () => {

    const location = useLocation();

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (hash) {
            setActiveTab(hash);
        }
    }, [location]);


    const [activeTab, setActiveTab] = useState('logIn');
    const [openSnackbar, setOpenSnackbar] = useState(false);


    return (
        <Box sx={{ my: "30px", width: "100vw", m: 0, p: 0 }}>
            <Stack direction="row" spacing={5} justifyContent="space-between" sx={{ width: "100%" }} >
                <Box sx={{ width: "50%" }}>
                    <img style={{ width: "100%" }}
                        src={image}
                        alt="fon"
                    />
                </Box>
                <Box sx={{
                    width: "50%", display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column", pt: "30px"
                }}>
                    <Typography variant="h4" className='title' sx={{ textAlign: "center", width: "100%" }} >МІЙ КАБІНЕТ</Typography>

                    <Tabs aria-label="tabs" defaultValue="logIn" value={activeTab} onChange={(e, value) => setActiveTab(value)} sx={{
                        bgcolor: 'transparent', width: "50%", display: "flex", alignItems: "center"
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
                            <Tab disableIndicator value="logIn" id="logIn">Увійти</Tab>
                            <Tab disableIndicator value="signUp" id="signUp">Зареєструватись</Tab>
                        </TabList>
                        <TabPanel value="logIn">
                            <LogIn />
                        </TabPanel>
                        <TabPanel value="signUp">
                            <Register />
                        </TabPanel>
                    </Tabs>

                    <Snackbar
                        startDecorator={<DoneRoundedIcon />}
                        color="success" size="lg" variant="soft"
                        autoHideDuration={5000}
                        open={openSnackbar}
                        onClose={(event, reason) => {
                            if (reason === 'clickaway') {
                                return;
                            }
                            setOpenSnackbar(false);
                        }}
                    >
                        Успішно зареєстровано!
                    </Snackbar>
                </Box>

            </Stack >
        </Box >
    );
};

export { AuthPage };