import React from 'react';
import { Container, Typography, Stack, Box } from "@mui/material";
import { FormControl, FormLabel, Input, Button, Tabs, TabList, Tab, TabPanel, Card, Divider, CardContent } from '@mui/joy';
import { Link } from 'react-router-dom'
import { tabClasses } from '@mui/joy/Tab'
import image from '../assets/loginpage.jpg'

const LoginPage = () => {
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

                    <Tabs aria- label="tabs" defaultValue="login" sx={{
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
                            <Tab disableIndicator value="login">Увійти</Tab>
                            <Tab disableIndicator value="signup">Зареєструватись</Tab>
                        </TabList>
                        <TabPanel value="login">
                            <Card variant="plain"
                                sx={{
                                    width: 300,
                                    gap: 2,
                                    boxShadow: 'md',
                                }}

                            >
                                <CardContent>
                                    <Typography variant='h5' >
                                        Увійти
                                    </Typography>
                                    <FormControl>
                                        <FormLabel>Логін чи e-mail адреса</FormLabel>
                                        <Input
                                            name="email"
                                            type="email"
                                            placeholder="johndoe@email.com"
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Пароль</FormLabel>
                                        <Input
                                            name="password"
                                            type="password"
                                            placeholder="password"
                                        />
                                    </FormControl>
                                </CardContent>

                                <Button variant="solid" color="neutral" sx={{ mt: 1 }}>УВІЙТИ</Button>

                            </Card>
                        </TabPanel>
                        <TabPanel value="signup">
                            <Card variant="plain"
                                sx={{
                                    width: 300,
                                    gap: 2,
                                    boxShadow: 'md',
                                }}

                            >
                                <CardContent>
                                    <Typography variant='h5' >
                                        Зареєструватись
                                    </Typography>
                                    <FormControl required className="checkout__form">
                                        <FormLabel >Ім'я</FormLabel>
                                        <Input />
                                    </FormControl>
                                    <FormControl required>
                                        <FormLabel>Логін чи e-mail адреса</FormLabel>
                                        <Input
                                            name="email"
                                            type="email"
                                            placeholder="johndoe@email.com"
                                        />
                                    </FormControl>
                                    <FormControl required>
                                        <FormLabel>Пароль</FormLabel>
                                        <Input
                                            name="password"
                                            type="password"
                                            placeholder="password"
                                        />
                                    </FormControl>
                                    <FormControl required>
                                        <FormLabel>Підтвердіть пароль</FormLabel>
                                        <Input
                                            name="password"
                                            type="password"
                                            placeholder="password"
                                        />
                                    </FormControl>
                                </CardContent>
                                <Button variant="solid" color="neutral" sx={{ mt: 1 }}>ЗАРЕЄСТРУВАТИСЬ</Button>
                            </Card>
                        </TabPanel>
                    </Tabs>
                </Box>

            </Stack >
        </Box >
    );
};

export { LoginPage };