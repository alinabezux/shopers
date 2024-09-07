import React from 'react';

import logo from '../assets/fon.jpeg'

import { Box, Typography } from '@mui/joy';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@mui/material';

const CompleteOrderPage = () => {

    const { orderId } = useParams();
    return (
        <Box className='completeOrderPage'>
            <Box >
                <img src={logo} alt='logo' />
            </Box>
            <Typography level='h4' sx={{ textAlign: "center" }}>Замовлення <Typography variant="soft" color="neutral">{orderId}</Typography>{' '} прийнято</Typography>
            <Typography level='h4'>Дякуємо за покупку 😊🛍️</Typography>
            <Button variant="outlined" size="large" className='white-button'>
                <Link to="/"
                    style={{
                        color: "inherit",
                        textDecoration: "none"
                    }}>НА ГОЛОВНУ</Link>
            </Button>
        </Box>
    );
};

export { CompleteOrderPage };