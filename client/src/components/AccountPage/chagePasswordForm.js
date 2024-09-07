import React, { useCallback, useState } from 'react';
import { Form, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { userActions } from '../../redux';

import { Alert, Button, FormControl, FormHelperText, FormLabel, Input, Snackbar } from '@mui/joy';
import { DoneRounded, ErrorOutlineRounded, InfoOutlined } from '@mui/icons-material';

const ChangePasswordForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const { userId } = useSelector(state => state.authReducer);
    const { pswrdError, pswrdLoading } = useSelector(state => state.userReducer);

    const { control, register, handleSubmit, reset, formState: { errors }, watch } = useForm();

    const handleChangePassword = useCallback(async (data) => {
        try {
            const res = await dispatch(userActions.changePassword({
                userId: userId,
                currentPassword: data.currentPassword,
                newPassword: data.newPassword
            }))
            if (res.meta.requestStatus === 'fulfilled') {
                setOpenSnackbar(true)
                reset();
            }
        } catch (error) {
            console.error('Error changing password:', error);
        }
    }, [dispatch, userId, reset, navigate]);

    return (
        <>
            <Form onSubmit={handleSubmit(handleChangePassword)} control={control}>
                {pswrdError ?
                    <Alert color="danger" variant="soft">
                        <ErrorOutlineRounded />
                        {pswrdError.message}
                    </Alert> : null}
                <FormControl error={errors.currentPassword ? true : false}>
                    <FormLabel>Поточний пароль</FormLabel>
                    <Input className='accountpage__input'
                        {...register('currentPassword', { required: 'Це поле є обов’язковим' })}
                        type="password"
                    />
                    {errors.currentPassword &&
                        <FormHelperText >
                            <InfoOutlined sx={{ mr: 1 }} />
                            {errors.currentPassword.message}
                        </FormHelperText>
                    }
                </FormControl>
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
                <Button className='accountpage__button' color="success" variant="solid" type="submit" loading={pswrdLoading}>ЗМІНИТИ ПАРОЛЬ</Button>
            </Form>
            <Snackbar
                startDecorator={<DoneRounded />}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
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
                Ваш пароль змінено!
            </Snackbar>
        </>

    );
};

export { ChangePasswordForm };
