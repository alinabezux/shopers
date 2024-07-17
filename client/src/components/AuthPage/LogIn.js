import React, { useEffect, useCallback, useState } from 'react';
import { Typography } from "@mui/material";
import { FormControl, FormLabel, Input, Button, Card, CardContent } from '@mui/joy';
import { Link, useNavigate, useLocation } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { useForm, Form } from "react-hook-form";
import Alert from '@mui/joy/Alert';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { authActions } from '../../redux';

const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();


    const { control, handleSubmit, register } = useForm();


    const { loading, logInError } = useSelector(state => state.authReducer);


    const submit = useCallback(async (data) => {
        try {
            const res = await dispatch(authActions.logIn({
                user: {
                    email: data.email,
                    password: data.password
                }
            }))
            console.log("LogIn response: ", res);
            if (res.meta.requestStatus === 'fulfilled') navigate('/')
            // else if (res.meta.requestStatus === 'fulfilled' && isAdmin) window.location.reload();
        } catch (e) {
            console.log("catch e: ", e);
        }
    }, [dispatch, navigate])


    return (

        <Form onSubmit={handleSubmit(submit)} control={control}>
            <Card variant="plain"
                sx={{
                    width: 300,
                    gap: 2,
                    boxShadow: 'md',
                }}
            >
                <CardContent sx={{ gap: 1 }}>
                    <Typography variant='h5' >
                        Увійти
                    </Typography>
                    {logInError ?
                        <Alert color="danger" variant="soft">
                            <ErrorOutlineRoundedIcon />
                            {logInError.message}
                        </Alert> : null}
                    <FormControl>
                        <FormLabel>Логін чи e-mail адреса</FormLabel>
                        <Input
                            startDecorator={<EmailRoundedIcon />}
                            name="email"
                            type="email"
                            placeholder="johndoe@email.com"
                            {...register('email', { required: true })}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Пароль</FormLabel>
                        <Input
                            startDecorator={<KeyRoundedIcon />}
                            name="password"
                            type="password"
                            placeholder="Введіть пароль..."
                            {...register('password', { required: true })}
                        />
                    </FormControl>
                </CardContent>
                <Button variant="solid" color="neutral" sx={{ mt: 1 }} type='submit'>УВІЙТИ</Button>
            </Card>
        </Form>

    );
};

export { LogIn };