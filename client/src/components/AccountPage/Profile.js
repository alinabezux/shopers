import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, useForm } from 'react-hook-form';

import { ChangePasswordForm } from './chagePasswordForm';
import { authActions, userActions } from '../../redux';

import Edit from '@mui/icons-material/Edit';
import { Box, Typography } from '@mui/material';
import { Card, CardContent, FormControl, FormLabel, Input, Divider, Button, FormHelperText } from '@mui/joy';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { InfoOutlined } from '@mui/icons-material';


const Profile = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        await dispatch(authActions.logOut())
        navigate('/')
    };
    const { userId } = useSelector(state => state.authReducer);
    const { loading, dataLoading } = useSelector(state => state.userReducer);

    const { control, handleSubmit, register, reset, formState: { errors }, setValue } = useForm();


    const handleEditUser = useCallback(async (data) => {
        try {
            let userData = {};

            if (data.name) {
                userData.name = data.name;
            }
            if (data.surname) {
                userData.surname = data.surname;
            }
            if (data.phone) {
                userData.phone = data.phone;
            }
            if (data.email) {
                userData.email = data.email;
            }
            if (data.instagram) {
                userData.instagram = data.instagram;
            }

            await dispatch(userActions.updateUser({ userId: userId, user: userData }));
        } catch (error) {
            console.error('Error editing user:', error);
        }

    }, [dispatch, userId, reset, navigate]);


    return (
        <Box className='accountpage__profile' >
            <Box className='accountpage__profile-cards'>
                <Card variant="plain" sx={{ boxShadow: 'md' }} className='accountpage__card' >
                    <Typography className='accountpage__profile_title' variant='h5'>ЗМІНА ДАНИХ</Typography>
                    <Divider inset="none" />
                    {errors.phone &&
                        <FormHelperText sx={{ color: "#C41C1C" }}>
                            <InfoOutlined sx={{ mr: 1 }} />
                            {errors.phone.message}
                        </FormHelperText>
                    }
                    <Form onSubmit={handleSubmit(handleEditUser)} control={control}>
                        <CardContent className='info'>
                            <FormControl >
                                <FormLabel >Ім'я</FormLabel>
                                <Input className='accountpage__input' placeholder={user.name} {...register('name')} />
                            </FormControl>
                            <FormControl >
                                <FormLabel>Прізвище</FormLabel>
                                <Input className='accountpage__input' placeholder={user.surname} {...register('surname',)} />
                            </FormControl>
                            <FormControl error={errors.phone ? true : false}>
                                <FormLabel >Номер телефону</FormLabel>
                                <Input className='accountpage__input' startDecorator={<Typography>+38</Typography>} placeholder={user.phone}
                                    {...register('phone',
                                        {
                                            validate: {
                                                length: value => value.length === 10 || 'Номер телефону має містити 10 символів'
                                            }
                                        })} />

                            </FormControl>
                            <FormControl >
                                <FormLabel>Ваш нік в Instagram</FormLabel>
                                <Input className='accountpage__input' startDecorator={<AlternateEmailRoundedIcon />}
                                    placeholder={user.instagram}
                                    {...register('instagram')} />
                            </FormControl>
                            <FormControl sx={{ gridColumn: '1/-1' }}>
                                <FormLabel>E-mail адреса</FormLabel>
                                <Input className='accountpage__input' startDecorator={<EmailRoundedIcon />}
                                    placeholder={user.email}
                                    {...register('email')}
                                />
                            </FormControl>
                            <Typography sx={{ gridColumn: '1/-1', fontSize: "12px" }}>* ці дані використовуватимуться при оформленні замовлення</Typography>
                        </CardContent>
                        <Button className='accountpage__button' color="success" variant="solid" endDecorator={<Edit />} type="submit" loading={dataLoading}>ЗБЕРЕГТИ ЗМІНИ</Button>
                    </Form>
                </Card>

                <Card color="neutral" variant="outlined" className='accountpage__card' sx={{ boxShadow: 'md', }}>
                    <Typography className='accountpage__profile_title' variant='h5'>ЗМІНА ПАРОЛЮ</Typography>
                    <Divider inset="none" />
                    <CardContent >
                        <ChangePasswordForm />
                    </CardContent>
                </Card>
            </Box>
            <Button className='accountpage__button' variant="soft" color="danger" onClick={handleLogOut} startDecorator={<LogoutRoundedIcon />}>ВИЙТИ</Button>
        </Box >
    )
};
export { Profile };