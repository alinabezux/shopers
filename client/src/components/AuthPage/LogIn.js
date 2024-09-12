import React, { useCallback } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Form } from "react-hook-form";

import { authActions } from '../../redux';

import { Typography } from "@mui/material";
import { FormControl, FormLabel, Input, Button, Card, CardContent } from '@mui/joy';
import Alert from '@mui/joy/Alert';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [query] = useSearchParams();

    const { control, handleSubmit, register } = useForm();

    const { loading, logInError } = useSelector(state => state.authReducer);
    const { user } = useSelector(state => state.userReducer);

    const submit = useCallback(async (data) => {
        try {
            const res = await dispatch(authActions.logIn({
                user: {
                    email: data.email,
                    password: data.password
                }
            }))
            if (res.meta.requestStatus === 'fulfilled') {
                if (query.has('admin')) {
                    if (!user.isAdmin) {
                        navigate('/admin')
                    }
                } else {
                    navigate('/')
                }

            }
        } catch (e) {
            console.log("catch e: ", e);
        }
    }, [dispatch, navigate, query, user.isAdmin])


    return (
        <Form onSubmit={handleSubmit(submit)} control={control} className='authpage__tabpanel'>
            <Card variant="plain" className='authpage__card'
                sx={{ boxShadow: 'md' }}
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
                        <FormLabel>E-mail адреса</FormLabel>
                        <Input className='authpage__input'
                            startDecorator={<EmailRoundedIcon />}
                            name="email"
                            type="email"
                            placeholder="johndoe@email.com"
                            {...register('email', { required: true })}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Пароль</FormLabel>
                        <Input className='authpage__input'
                            startDecorator={<KeyRoundedIcon />}
                            name="password"
                            type="password"
                            placeholder="Введіть пароль..."
                            {...register('password', { required: true })}
                        />
                    </FormControl>
                </CardContent>
                <Button variant="soft" color="primary" sx={{ mt: 1 }} type='submit' className='authpage__button' loading={loading}>УВІЙТИ</Button>
                <Link to='/password/forgot' className='link  fgp_pswrd'>Забули пароль?</Link>
            </Card>
        </Form >


    );
};

export { LogIn };