import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Form } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi"

import { authActions } from '../../redux';
import { userValidator } from '../../validators/user.validator';

import { Typography } from "@mui/material";
import { FormControl, FormLabel, Input, Button, Card, CardContent } from '@mui/joy';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import FormHelperText from '@mui/joy/FormHelperText';
import Alert from '@mui/joy/Alert';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';

const Register = ({ setOpenSnackbar }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { control, handleSubmit, register, formState: { errors } } = useForm({
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
                if (res.meta.requestStatus === 'fulfilled') {
                    navigate('/auth#logIn')
                    setOpenSnackbar(true)
                }
            } else {
                setPasswordError('Паролі не співпадають!')
            }
        } catch (e) {
            console.log("catch e: ", e);
        }
    }, [dispatch, navigate, setOpenSnackbar])

    return (
        <Form onSubmit={handleSubmit(submit)} control={control}>
            <Card variant="plain" className='authpage__card'
                sx={{
                    boxShadow: 'md',
                }}
            >
                <CardContent sx={{ gap: 1 }} >
                    <Typography variant='h5' >
                        Зареєструватись
                    </Typography>

                    {registerError ?
                        <Alert color="danger" variant="soft">
                            <AlternateEmailRoundedIcon />
                            {registerError.message}
                        </Alert> : null}

                    <FormControl required className="checkout__form" error={errors.name ? true : false}>
                        <FormLabel >Ім'я</FormLabel>
                        <Input className='authpage__input' placeholder="Введіть ваше ім'я" {...register('name')} />
                        {errors.name &&
                            <FormHelperText >
                                <InfoOutlined sx={{ mr: 1 }} />
                                {errors.name.message}
                            </FormHelperText>
                        }
                    </FormControl>

                    <FormControl required error={errors.email ? true : false}>
                        <FormLabel>E-mail адреса</FormLabel>
                        <Input className='authpage__input'
                            startDecorator={<EmailRoundedIcon />}
                            name="email"
                            type="email"
                            placeholder="johndoe@email.com"
                            {...register('email')}
                        />
                        {errors.email &&
                            <FormHelperText >
                                <InfoOutlined sx={{ mr: 1 }} />
                                {errors.email.message}
                            </FormHelperText>
                        }
                    </FormControl>

                    <FormControl required error={(errors.password || passwordError) ? true : false}>
                        <FormLabel>Пароль</FormLabel>
                        <Input className='authpage__input'
                            startDecorator={<KeyRoundedIcon />}
                            name="password"
                            type="password"
                            placeholder="Придумайте пароль..."
                            {...register('password')}
                        />
                        {errors.password ?
                            <FormHelperText >
                                <InfoOutlined sx={{ mr: 1 }} />
                                {errors.password.message}
                            </FormHelperText> : null
                        }
                        {passwordError ?
                            <FormHelperText >
                                <InfoOutlined sx={{ mr: 1 }} />
                                {passwordError}
                            </FormHelperText> : null
                        }

                    </FormControl>
                    <FormControl required error={passwordError ? true : false}>
                        <FormLabel>Підтвердіть пароль</FormLabel>
                        <Input className='authpage__input'
                            startDecorator={<KeyRoundedIcon />}
                            name="confirmPassword"
                            type="password"
                            placeholder="Підтвердіть ваш пароль..."
                            {...register('confirmPassword')}
                        />
                        {passwordError ?
                            <FormHelperText >
                                <InfoOutlined sx={{ mr: 1 }} />
                                {passwordError}
                            </FormHelperText> : null
                        }
                    </FormControl>
                </CardContent>
                <Button variant="soft" color="primary" type='submit' sx={{ mt: 1 }} loading={loading} className='authpage__button'
                >ЗАРЕЄСТРУВАТИСЬ</Button>
            </Card>
        </Form>

    );
};

export { Register };