import React, { useCallback } from 'react';
import { Form, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { userService } from '../../services';
import { userActions } from '../../redux';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, FormControl, FormHelperText, FormLabel, Input } from '@mui/joy';
import { ErrorOutlineRounded, InfoOutlined } from '@mui/icons-material';

const ChangePasswordForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId } = useSelector(state => state.authReducer);
    const { pswrdError, pswrdLoading } = useSelector(state => state.userReducer);

    const { control, register, handleSubmit, reset, formState: { errors }, watch } = useForm();

    const handleChangePassword = useCallback(async (data) => {
        try {
            await dispatch(userActions.changePassword({
                userId: userId,
                currentPassword: data.currentPassword,
                newPassword: data.newPassword
            }))
            reset();
        } catch (error) {
            console.error('Error changing password:', error);
        }
    }, [dispatch, userId, reset, navigate]);

    return (
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
            <Button className='accountpage__button' color="success" variant="solid" type="submit" loading={pswrdLoading ? true : false}>ЗМІНИТИ ПАРОЛЬ</Button>
        </Form>

    );
};

export { ChangePasswordForm };
