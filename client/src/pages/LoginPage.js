import React from 'react';
import { Container, Typography, Stack } from "@mui/material";
import { Sheet, FormControl, FormLabel, Input, Button, Tabs, TabList, Tab, TabPanel, Card, Divider, CardContent } from '@mui/joy';
import { Link } from 'react-router-dom'
import { tabClasses } from '@mui/joy/Tab'

const LoginPage = () => {
    return (
        <Container sx={{ my: "30px" }}>
            <Typography variant="h4" className='title'>МІЙ КАБІНЕТ</Typography>
            <Stack>
                <Tabs aria-label="tabs" defaultValue={0} sx={{ bgcolor: 'transparent' }}>
                    <TabList
                        disableUnderline
                        sx={{
                            p: 0.5,
                            gap: 0.5,
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
                                mx: 'auto', // margin left & right
                                my: 4, // margin top & bottom
                                py: 3, // padding top & bottom
                                px: 2, // padding left & right
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                borderRadius: 'sm',
                                boxShadow: 'md',
                            }}

                        >
                            <CardContent>
                                <Typography variant='h5' >
                                    Увійти
                                </Typography>
                                {/* <Divider inset="none" /> */}
                                <FormControl>
                                    <FormLabel>Логін чи e-mail адреса</FormLabel>
                                    <Input
                                        // html input attribute
                                        name="email"
                                        type="email"
                                        placeholder="johndoe@email.com"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Пароль</FormLabel>
                                    <Input
                                        // html input attribute
                                        name="password"
                                        type="password"
                                        placeholder="password"
                                    />
                                </FormControl>
                            </CardContent>

                            <Button variant="solid" color="neutral" sx={{ mt: 1 }}>Увійти</Button>
                            <Typography
                                endDecorator={<Link to="/sign-up">Зареєструватись</Link>}
                                fontSize="sm"
                                sx={{ alignSelf: 'center' }}
                            >
                                Не маєте акаунту?
                            </Typography>
                        </Card>
                    </TabPanel>

                </Tabs>
            </Stack>
        </Container>
    );
};

export { LoginPage };