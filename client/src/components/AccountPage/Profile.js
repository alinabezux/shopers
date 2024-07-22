import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { Card, CardContent, FormControl, FormLabel, Input, Divider, Button, Chip } from '@mui/joy';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import Edit from '@mui/icons-material/Edit';
import { authActions } from '../../redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';




const Profile = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleLogOut = async () => {
        await dispatch(authActions.logOut())
        navigate('/')
        window.location.reload()
    };
    return (
        <Box className='accountpage__profile' >
            <Box className='accountpage__profile-cards'>
                <Card variant="plain" sx={{ boxShadow: 'md' }} className='accountpage__card' >
                    <Typography className='accountpage__profile_title' variant='h5'>ЗМІНА ДАНИХ</Typography>
                    <Divider inset="none" />
                    <CardContent className='info'>
                        <FormControl >
                            <FormLabel >Ім'я</FormLabel>
                            <Input className='accountpage__input' placeholder={user.name} />
                        </FormControl>
                        <FormControl >
                            <FormLabel>Прізвище</FormLabel>
                            <Input className='accountpage__input' placeholder={user.surname} />
                        </FormControl>
                        <FormControl >
                            <FormLabel >Номер телефону</FormLabel>
                            <Input className='accountpage__input' startDecorator={<Typography>+380</Typography>} placeholder={user.phone} />
                        </FormControl>
                        <FormControl >
                            <FormLabel>Ваш нік в Instagram</FormLabel>
                            <Input className='accountpage__input' startDecorator={<AlternateEmailRoundedIcon />} placeholder={user.instagram} />
                        </FormControl>
                        <FormControl sx={{ gridColumn: '1/-1' }}>
                            <FormLabel>E-mail адреса</FormLabel>
                            <Input className='accountpage__input' startDecorator={<EmailRoundedIcon />} placeholder={user.email} />
                        </FormControl>
                        <Typography sx={{ gridColumn: '1/-1', fontSize: "12px" }}>* ці дані використовуватимуться при оформленні замовлення</Typography>
                    </CardContent>
                </Card>
                <Card color="neutral" variant="outlined" className='accountpage__card' sx={{ boxShadow: 'md', }}>
                    <Typography className='accountpage__profile_title' variant='h5'>ЗМІНА ПАРОЛЮ</Typography>
                    <Divider inset="none" />
                    <FormControl >
                        <FormLabel>Поточний пароль</FormLabel>
                        <Input className='accountpage__input'
                            name="password"
                            type="password"
                            placeholder="password"
                        />
                    </FormControl>
                    <FormControl >
                        <FormLabel>Новий пароль</FormLabel>
                        <Input className='accountpage__input'
                            name="password"
                            type="password"
                            placeholder="password"
                        />
                    </FormControl>
                    <FormControl >
                        <FormLabel>Повторіть новий пароль </FormLabel>
                        <Input className='accountpage__input'
                            name="password"
                            type="password"
                            placeholder="password"
                        />
                    </FormControl>
                </Card>
            </Box>
           
            <Button variant="soft" color="danger" onClick={handleLogOut} startDecorator={<LogoutRoundedIcon />}>ВИЙТИ</Button>
            <Button className='accountpage__button' color="success" variant="solid"  endDecorator={<Edit />}>ЗБЕРЕГТИ ЗМІНИ</Button>
        </Box >
    )
};
export { Profile };