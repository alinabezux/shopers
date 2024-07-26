import React from 'react';
import { Typography } from '@mui/joy';
import { useParams } from 'react-router-dom';

const CompleteOrderPage = () => {

    const { orderId } = useParams();
    return (
        <Typography>Твоє змовлення - {orderId} </Typography>
    );
};

export { CompleteOrderPage };