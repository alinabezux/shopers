import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { Card, CardContent, FormControl, FormLabel, Input, Divider, Button, Chip } from '@mui/joy';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import Edit from '@mui/icons-material/Edit';
const Profile = () => {
    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", }}>

            <Stack direction="row" spacing={2}>
                <Card variant="plain" sx={{ width: "50%", boxShadow: 'md', }} >
                    <Typography className='checkout__title' >ЗМІНА ДАНИХ</Typography>
                    <Divider inset="none" />
                    <CardContent className="checkout__info">
                        <FormControl className="checkout__form">
                            <FormLabel >Ім'я</FormLabel>
                            <Input />
                        </FormControl>
                        <FormControl className="checkout__form">
                            <FormLabel>Прізвище</FormLabel>
                            <Input />
                        </FormControl>
                        <FormControl className="checkout__form">
                            <FormLabel >Номер телефону</FormLabel>
                            <Input startDecorator={<Typography>+380</Typography>} />
                        </FormControl>
                        <FormControl className="checkout__form">
                            <FormLabel>Ваш нік в Instagram</FormLabel>
                            <Input startDecorator={<AlternateEmailRoundedIcon />} />
                        </FormControl>
                        <FormControl sx={{ gridColumn: '1/-1' }}>
                            <FormLabel>E-mail адреса</FormLabel>
                            <Input startDecorator={<EmailRoundedIcon />} />
                        </FormControl>
                    </CardContent>
                </Card>
                <Card color="neutral" variant="outlined" sx={{ width: "50%", boxShadow: 'md', }}>
                    <Typography className='checkout__title'>ЗМІНА ПАРОЛЮ</Typography>
                    <Divider inset="none" />
                    <FormControl >
                        <FormLabel>Поточний пароль</FormLabel>
                        <Input
                            name="password"
                            type="password"
                            placeholder="password"
                        />
                    </FormControl>
                    <FormControl >
                        <FormLabel>Новий пароль</FormLabel>
                        <Input
                            name="password"
                            type="password"
                            placeholder="password"
                        />
                    </FormControl>
                    <FormControl >
                        <FormLabel>Повторіть новий пароль </FormLabel>
                        <Input
                            name="password"
                            type="password"
                            placeholder="password"
                        />
                    </FormControl>
                </Card>
            </Stack>
            <Button color="success" variant="solid" sx={{ width: "50%", mt: 3 }} endDecorator={<Edit />}>ЗБЕРЕГТИ ЗМІНИ</Button>
        </Box >
    )
};
export { Profile };