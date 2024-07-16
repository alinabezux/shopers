import React from 'react';
import { Container, Typography, Stack, Box } from "@mui/material";
import { FormControl, FormLabel, Input, Button, Tabs, TabList, Tab, TabPanel, Card, Divider, CardContent } from '@mui/joy';
import { Link, useNavigate } from 'react-router-dom'
import { tabClasses } from '@mui/joy/Tab'
import image from '../assets/loginpage.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { userValidator } from '../validators/user.validator';
import { joiResolver } from "@hookform/resolvers/joi"
import { authActions } from '../redux';
import { useCallback, useState } from "react";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: joiResolver(userValidator.newUserValidator),
        mode: 'all'
    });
    const { loading, registerError } = useSelector(state => state.authReducer);
    const [passwordError, setPasswordError] = useState(null);

    const submit = useCallback(async (data) => {
        try {
            if (data.password === data.confirmPassword) {
                const res = await dispatch(authActions.register({
                    user: {
                        name: data.name,
                        email: data.email,
                        password: data.password
                    }
                }))
                if (res.meta.requestStatus === 'fulfilled') navigate('/logIn')
            } else {
                console.log('Паролі не співпадають!')
                setPasswordError('Паролі не співпадають!')
            }
        } catch (e) {
            console.log("catch e: ", e);
        }
    }, [dispatch, authActions, navigate]
    )

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
                            <form onSubmit={handleSubmit(submit)}>

                                <Card variant="plain"
                                    sx={{
                                        width: 300,
                                        gap: 2,
                                        boxShadow: 'md',
                                    }}

                                >
                                    <CardContent >
                                        <Typography variant='h5' >
                                            Зареєструватись
                                        </Typography>
                                        <FormControl required className="checkout__form" >
                                            <FormLabel >Ім'я</FormLabel>
                                            <Input placeholder="Введіть ваше ім'я" {...register('name', { required: true })}/>
                                        </FormControl>
                                        <FormControl required >
                                            <FormLabel>Логін чи e-mail адреса</FormLabel>
                                            <Input
                                                name="email"
                                                type="email"
                                                placeholder="johndoe@email.com"
                                                {...register('email', { required: true })}
                                            />
                                        </FormControl>
                                        <FormControl required >
                                            <FormLabel>Пароль</FormLabel>
                                            <Input
                                                name="password"
                                                type="password"
                                                placeholder="Придумайте пароль..."
                                                {...register('password', { required: true })}
                                            />
                                        </FormControl>
                                        <FormControl required >
                                            <FormLabel>Підтвердіть пароль</FormLabel>
                                            <Input
                                                name="password"
                                                type="password"
                                                placeholder="Підтвердіть ваш пароль..."
                                                {...register('confirmPassword', { required: true })}
                                            />
                                        </FormControl>
                                    </CardContent>
                                    <Button variant="solid" color="neutral" type='submit' sx={{ mt: 1 }}>ЗАРЕЄСТРУВАТИСЬ</Button>
                                </Card>
                            </form>
                        </TabPanel>
                    </Tabs>
                </Box>

            </Stack >
        </Box >
    );
};

export { LoginPage };