import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Card } from '@mui/joy';
import { Button } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';

import logo from '../assets/fon.jpeg';

const CompleteOrderPage = () => {
    const { orderId } = useParams();

    const isValidOrderId = Boolean(orderId && orderId !== 'null' && orderId !== 'undefined' && orderId.trim().length > 0);

    if (!isValidOrderId) {
        return (
            <Box className="complete-order-wrapper">
                <Card variant="outlined" className="complete-order-card">
                    <Box className="complete-order-logo-wrapper">
                        <img src={logo} alt="SHOPERS_VI" className="complete-order-brand-logo" />
                    </Box>
                    <Box className="complete-order-icon-wrapper invalid">
                        <SentimentDissatisfiedOutlinedIcon sx={{ fontSize: 58, color: '#dc2626' }} />
                    </Box>
                    <Typography level="h3" className="complete-order-title">
                        Замовлення не знайдено
                    </Typography>
                    <Typography level="body1" className="complete-order-subtitle">
                        Замовлення з таким номером не існує або ще не було створене.
                    </Typography>
                    <Button
                        variant="contained"
                        component={Link}
                        to="/shop"
                        className="complete-order-main-btn"
                        startIcon={<StorefrontOutlinedIcon />}
                    >
                        ДО КАТАЛОГУ
                    </Button>
                </Card>
            </Box>
        );
    }

    return (
        <Box className="complete-order-wrapper">
            <Card variant="outlined" className="complete-order-card">
                {/* Brand Logo */}
                <Box className="complete-order-logo-wrapper">
                    <img src={logo} alt="SHOPERS_VI" className="complete-order-brand-logo" />
                </Box>

                {/* Big success checkmark icon */}
                <Box className="complete-order-icon-wrapper">
                    <CheckCircleRoundedIcon className="complete-order-check-icon" />
                </Box>

                {/* Main headings */}
                <Typography level="h2" className="complete-order-title">
                    Дякуємо за замовлення!
                </Typography>
                <Typography level="body1" className="complete-order-subtitle">
                    Ваше замовлення успішно прийнято в обробку.
                </Typography>

                {/* Order ID Card */}
                <Box className="complete-order-number-box">
                    <Typography className="complete-order-number-label">
                        Номер вашого замовлення
                    </Typography>
                    <Typography className="complete-order-number-value">
                        {orderId}
                    </Typography>
                </Box>

                {/* Email Notice Card */}
                <Box className="complete-order-email-alert">
                    <MarkEmailReadOutlinedIcon className="complete-order-email-icon" />
                    <Typography className="complete-order-email-text">
                        На вашу електронну пошту надіслано лист із деталями замовлення. Будь ласка, перевірте свою пошту, а також папку "Спам", якщо лист не з'явився у вхідних повідомленнях.
                    </Typography>
                </Box>

                {/* Button to Home / Shop */}
                <Button
                    variant="contained"
                    component={Link}
                    to="/"
                    className="complete-order-main-btn"
                >
                    ПЕРЕЙТИ ДО МАГАЗИНУ
                </Button>
            </Card>
        </Box>
    );
};

export { CompleteOrderPage };
