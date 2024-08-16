import React, { useEffect, useCallback, useState } from 'react';
import { Typography, Box, Divider } from "@mui/material";
import { FormControl, FormLabel, Input, Button, Card, CardContent, Container } from '@mui/joy';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { useForm, Form } from "react-hook-form";
import Alert from '@mui/joy/Alert';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import Snackbar from '@mui/joy/Snackbar';
import { DoneRounded, EmailRounded, ErrorOutlineRounded } from '@mui/icons-material';
import { authActions } from '../redux';

const ForgotPasswordPage = () => {
    const dispatch = useDispatch();
    const [query] = useSearchParams();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { control, handleSubmit, register } = useForm();

    const { loading, error } = useSelector(state => state.authReducer);


    const submit = useCallback(async (data) => {
        try {
            const res = await dispatch(authActions.forgotPassword({ email: data.email }))
            if (res.meta.requestStatus === 'fulfilled') {
                setOpenSnackbar(true)
            }
        } catch (e) {
            console.log("catch e: ", e);
        }
    }, [dispatch,setOpenSnackbar])

    return (
        <Container sx={{ width: "500px", marginTop: "30px" }}>
            <Snackbar
                startDecorator={<DoneRounded />}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                color="success" size="lg" variant="soft"
                open={openSnackbar}
                onClose={(event, reason) => {
                    if (reason === 'clickaway') {
                        return;
                    }
                    setOpenSnackbar(false);
                }}
            >
                Посилання для відновлення паролю надіслано на пошту.
            </Snackbar>
            <Form onSubmit={handleSubmit(submit)} control={control} className='authpage__tabpanel'>
                <Typography sx={{ margin: 1 }}>
                    Забули пароль? Будь ласка, введіть вашу e-mail адресу. Ви отримаєте електронний лист з посиланням для створення нового паролю.
                </Typography>
                <Card variant="plain" className='authpage__card'
                    sx={{ boxShadow: 'md', margin: 1 }}
                >
                    <CardContent sx={{ gap: 1 }}>
                        {error ?
                            <Alert color="danger" variant="soft">
                                <ErrorOutlineRounded />
                                {error.message}
                            </Alert> : null}
                        <FormControl>
                            <FormLabel>E-mail адреса</FormLabel>
                            <Input className='authpage__input'
                                startDecorator={<EmailRounded />}
                                name="email"
                                type="email"
                                placeholder="johndoe@email.com"
                                {...register('email', { required: true })}
                            />
                        </FormControl>

                    </CardContent>
                    <Button loading={loading} variant="soft" color="neutral" sx={{ mt: 1 }} type='submit' className='authpage__button'>СКИНУТИ ПАРОЛЬ</Button>
                </Card>
            </Form >
        </Container>
    );
};

export { ForgotPasswordPage };