import React, { useCallback } from 'react';
import { Typography } from "@mui/material";
import { FormControl, FormLabel, Input, Button, Card, CardContent } from '@mui/joy';
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Form } from "react-hook-form";
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import FormHelperText from '@mui/joy/FormHelperText';
import Alert from '@mui/joy/Alert';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import { authActions } from '../redux';


const SetNewPasswordPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const token = new URLSearchParams(location.search).get('token');

    const { control, handleSubmit, register, reset, formState: { errors }, watch } = useForm();

    const { loading, error } = useSelector(state => state.authReducer);


    const submit = useCallback(async (data) => {
        try {
            const res = await dispatch(authActions.setNewPassword({
                token: token,
                newPassword: data.newPassword
            }))
            if (res.meta.requestStatus === 'fulfilled') {
                navigate('/auth#logIn')
                reset();
            }

        } catch (e) {
            console.log("catch e: ", e);
        }
    }, [dispatch, navigate, token, reset])

    return (

        <Form onSubmit={handleSubmit(submit)} control={control}>
            <Card variant="plain" className='authpage__card'
                sx={{
                    boxShadow: 'md',
                }}
            >
                <CardContent sx={{ gap: 1 }} >
                    <Typography variant='h5' >
                        Зміна паролю
                    </Typography>

                    {error ?
                        <Alert color="danger" variant="soft">
                            <AlternateEmailRoundedIcon />
                            {error.message}
                        </Alert> : null}

                    <FormControl error={errors.newPassword || errors.confirmPassword ? true : false}>
                        <FormLabel>Новий пароль</FormLabel>
                        <Input className='accountpage__input'
                            {...register('newPassword', { required: "Обов'язкове поле" })}
                            type="password"
                        />
                        {errors.newPassword &&
                            <FormHelperText >
                                <InfoOutlined sx={{ mr: 1 }} />
                                {errors.newPassword.message}
                            </FormHelperText>
                        }
                    </FormControl>
                    <FormControl error={errors.confirmPassword ? true : false}>
                        <FormLabel>Повторіть новий пароль</FormLabel>
                        <Input className='accountpage__input'
                            {...register('confirmPassword', {
                                required: "Обов'язкове поле",
                                validate: value => value === watch('newPassword') || 'Паролі не співпадають'
                            })}
                            type="password"
                        />
                        {errors.confirmPassword &&
                            <FormHelperText >
                                <InfoOutlined sx={{ mr: 1 }} />
                                {errors.confirmPassword.message}
                            </FormHelperText>
                        }
                    </FormControl>
                </CardContent>
                <Button loading={loading} variant="soft" color="primary" type='submit' sx={{ mt: 1 }} className='authpage__button'
                >ЗМІНИТИ ПАРОЛЬ</Button>
            </Card>
        </Form>


    );
};

export { SetNewPasswordPage };