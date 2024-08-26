import React from 'react';
import { Box, Typography } from '@mui/joy';
import { Link, useParams } from 'react-router-dom';
import logo from '../assets/fon.jpeg'
import { BlackButton } from '../components/DrawerBasket'
const CompleteOrderPage = () => {

    const { orderId } = useParams();
    return (
        <Box className='completeOrderPage'>
            <Box >
                <img src={logo} alt='logo' />
            </Box>
            <Typography level='h4' sx={{ textAlign: "center" }}>Замовлення <Typography variant="soft" color="neutral">{orderId}</Typography>{' '} прийнято</Typography>
            <Typography level='h4'>Дякуємо за покупку 😊🛍️</Typography>
            <BlackButton variant="outlined" size="large">
                <Link to="/"
                    style={{
                        color: "inherit",
                        textDecoration: "none"
                    }}>НА ГОЛОВНУ</Link>
            </BlackButton>
        </Box>
    );
};

export { CompleteOrderPage };