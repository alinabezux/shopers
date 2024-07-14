import React from 'react';
import { Outlet } from "react-router-dom";
import { Container, Typography } from '@mui/material';

const AccountPage = () => {
    return (
        <Container>
            <Typography variant="h4" className='title'>МІЙ КАБІНЕТ </Typography>
            <Outlet />
        </Container>
    );
};

export { AccountPage };