import React, { useEffect, useState } from 'react';
import { useLocation, Link, useSearchParams } from 'react-router-dom'

import image from '../assets/loginpage.jpg'

import { Typography, Stack, Box } from "@mui/material";
import { Tabs, TabList, Tab, TabPanel, Alert } from '@mui/joy';
import { tabClasses } from '@mui/joy/Tab'
import Snackbar from '@mui/joy/Snackbar';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import WarningIcon from '@mui/icons-material/Warning';

import { LogIn, Register } from '../components';

const AuthPage = () => {
    const [query] = useSearchParams();
    const location = useLocation();

    const [activeTab, setActiveTab] = useState('logIn');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (hash) {
            setActiveTab(hash);
        }
    }, [location]);


    return (
        <Box className='authpage'>
            <Stack className='authpage__content' >
                <Box className='authpage__image' >
                    <img
                        src={image}
                        alt="fon"
                    />
                </Box>
                <Box className='authpage__main' >
                    <Typography variant="h5" className='title' >МІЙ КАБІНЕТ</Typography>
                    <Tabs className='tabs' aria-label="tabs" defaultValue="logIn" value={activeTab} onChange={(e, value) => setActiveTab(value)} >
                        <TabList className='authpage__tablist'
                            disableUnderline
                            sx={{
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
                            <Link to='/auth#logIn' className='link'>
                                <Tab disableIndicator sx={{ fontWeight: "500" }} value="logIn" id="logIn">УВІЙТИ</Tab>
                            </Link>
                            <Link to='/auth#signUp' className='link'>
                                <Tab disableIndicator sx={{ fontWeight: "500" }} value="signUp" id="signUp">ЗАРЕЄСТРУВАТИСЬ</Tab>
                            </Link>
                        </TabList>
                        {query.has('expSession') &&
                            <Alert
                                startDecorator={<WarningIcon />}
                                color="danger"
                                // size="sm"
                                variant="soft"
                                sx={{ width: "300px", mt: 2 }}
                            >
                                Сесія вашого акаунту закінчилась. <br />Будь ласка, увійдіть.
                            </Alert>
                        }
                        {query.has('admin') &&
                            <Alert
                                startDecorator={<WarningIcon />}
                                color="danger"
                                // size="sm"
                                variant="soft"
                                sx={{ width: "300px", mt: 2 }}
                            >
                                Підтвердіть,що ви адміністратор!
                            </Alert>}
                        <TabPanel value="logIn">
                            <LogIn />
                        </TabPanel>
                        <TabPanel value="signUp">
                            <Register setOpenSnackbar={setOpenSnackbar} />
                        </TabPanel>
                    </Tabs>
                </Box>
            </Stack >
            <Snackbar
                startDecorator={<DoneRoundedIcon />}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                color="success" size="lg" variant="soft"
                autoHideDuration={3000}
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


        </Box >
    );
};

export { AuthPage };