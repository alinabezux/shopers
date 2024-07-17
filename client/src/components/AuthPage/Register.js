import React, { useEffect, useCallback, useState } from 'react';
import { Typography } from "@mui/material";
import { FormControl, FormLabel, Input, Button, TabPanel, Card, CardContent } from '@mui/joy';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Form } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi"
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import FormHelperText from '@mui/joy/FormHelperText';
import Alert from '@mui/joy/Alert';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import { authActions } from '../../redux';
import { userValidator } from '../../validators/user.validator';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();


    const { control, handleSubmit, register, formState: { errors } } = useForm({
        resolver: joiResolver(userValidator.newUserValidator),
        mode: 'all'
    });


    const { loading, registerError } = useSelector(state => state.authReducer);
    const [passwordError, setPasswordError] = useState(null);
    const [activeTab, setActiveTab] = useState('logIn');
    const [openSnackbar, setOpenSnackbar] = useState(false);

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
                if (res.meta.requestStatus === 'fulfilled') navigate('/auth#logIn')
                setOpenSnackbar(true)
            } else {
                setPasswordError('Паролі не співпадають!')
            }
        } catch (e) {
            console.log("catch e: ", e);
        }
    }, [dispatch, navigate])

    return (

        <TabPanel value="signUp">
            <Form onSubmit={handleSubmit(submit)} control={control}>
                <Card variant="plain"
                    sx={{
                        width: 300,
                        gap: 2,
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
                            <Input placeholder="Введіть ваше ім'я" {...register('name')} />
                            {errors.name &&
                                <FormHelperText >
                                    <InfoOutlined sx={{ mr: 1 }} />
                                    {errors.name.message}
                                </FormHelperText>
                            }
                        </FormControl>

                        <FormControl required error={errors.email ? true : false}>
                            <FormLabel>Логін чи e-mail адреса</FormLabel>
                            <Input
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
                            <Input
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
                                    <InfoOutlined sx={{ mr: 1 }}/>
                                    {passwordError}
                                </FormHelperText> : null
                            }

                        </FormControl>
                        <FormControl required error={passwordError ? true : false}>
                            <FormLabel>Підтвердіть пароль</FormLabel>
                            <Input
                                startDecorator={<KeyRoundedIcon />}
                                name="confirmPassword"
                                type="password"
                                placeholder="Підтвердіть ваш пароль..."
                                {...register('confirmPassword')}
                            />
                            {passwordError ?
                                <FormHelperText >
                                    <InfoOutlined sx={{ mr: 1 }}/>
                                    {passwordError}
                                </FormHelperText> : null
                            }
                        </FormControl>
                    </CardContent>
                    <Button variant="solid" color="neutral" type='submit' sx={{ mt: 1 }}
                    >ЗАРЕЄСТРУВАТИСЬ</Button>
                </Card>
            </Form>
        </TabPanel>
    );
};

export { Register };