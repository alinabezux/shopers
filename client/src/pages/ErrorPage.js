import React from 'react';
import { Link } from 'react-router-dom';

import { Box } from '@mui/joy';
import { Button, Typography } from '@mui/material';

const ErrorPage = ({ errorCode = 404, errorMessage = "Сторінку не знайдено" }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 5,
                textAlign: 'center',
            }}
        >
            <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', color: '#d32f2f' }}>
                {errorCode}
            </Typography>
            <Typography variant="h5" sx={{ mb: 2 }}>
                {errorMessage}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
                Вибачте, але сталася помилка. Спробуйте пізніше або поверніться на головну сторінку.
            </Typography>
            <Box>
                <Button variant="outlined" size="large" className="white-button">
                    <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>НА ГОЛОВНУ</Link>
                </Button>
            </Box>
        </Box>
    );
};

export { ErrorPage };
