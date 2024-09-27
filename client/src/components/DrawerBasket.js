import React, {  useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { Link } from 'react-router-dom';

import { ProductInBasket } from './ProductInBasket';
import { basketActions } from '../redux/slices/basket.slice';

import {
    Box,
    IconButton,
    Typography,
    Container,
    Stack,
    CircularProgress
} from "@mui/material";
import Button2 from "@mui/material/Button";
import Button from '@mui/joy/Button';
import { Alert, Chip } from "@mui/joy";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import emoji from '../assets/emoji glasses.png'

const DrawerBasket = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const { basket, loading } = useSelector(state => state.basketReducer);
    const { userId } = useSelector(state => state.authReducer);
    const [localBasket, setLocalBasket] = useState([]);

    useEffect(() => {
        if (userId && open) {
            dispatch(basketActions.getBasket(userId));
        }
    }, [dispatch, userId, basket.length, open]);

    useEffect(() => {
        if (!userId && open) {
            const savedBasket = JSON.parse(localStorage.getItem('basket')) || {};
            setLocalBasket(Object.values(savedBasket));
        }
    }, [userId, open]);

    const handleUpdateBasket = (updatedBasket) => {
        setLocalBasket(Object.values(updatedBasket));
        localStorage.setItem('basket', JSON.stringify(updatedBasket)); // Оновлюємо localStorage
    };

    const basketToUse = userId ? basket : localBasket;

    const totalPrice = useMemo(() => {
        return basketToUse.reduce((total, productInBasket) => total + productInBasket.price * productInBasket.quantity, 0);
    }, [basketToUse]);

    const totalCashback = useMemo(() => {
        return basketToUse.reduce((total, productInBasket) => total + productInBasket.cashback, 0);
    }, [basketToUse]);


    return (
        <Drawer open={open} onClose={onClose} anchor="right">
            <Box className='basket'>
                <Box className='basket__header' >
                    <Typography className='basket__title' variant="h4" >КОШИК</Typography>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="close drawer"
                        onClick={onClose}
                        sx={{ px: "0" }}
                    >
                        <CloseIcon fontSize="large" />
                    </IconButton>

                </Box>
                {!userId &&
                    <Alert sx={{ m: 2 }}
                        variant="soft"
                        color="success"
                        startDecorator={<img src={emoji} alt='emoji' loading="lazy" style={{ height: "20px" }} />}
                    >
                        <Link className='link' to='/auth#logIn'>
                            <Button onClick={onClose} size="sm" variant="outlined" color="success" type='submit' className='authpage__button'>Авторизуйся</Button>
                        </Link>
                        та отримуй КЕШБЕК на це замовлення!
                    </Alert>
                }
                {loading ?
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                        <CircularProgress color="inherit" />
                    </Box> :
                    (basketToUse.length > 0 ?
                        (
                            <Container className='basket__content'>
                                <Box className='basket__products'>
                                    <Stack direction="column" spacing={2} alignItems="center">
                                        {basketToUse.map(productInBasket => (
                                            <ProductInBasket key={userId ? productInBasket._id : productInBasket.id} productInBasket={productInBasket} setOpenBasket={onClose} onUpdateBasket={handleUpdateBasket} />
                                        ))}
                                    </Stack>
                                </Box>
                                <Stack direction="column" className='basket__order'>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography className="basket__price">Разом :</Typography>
                                        <Typography className="basket__price">{totalPrice} грн.</Typography>
                                    </Stack>
                                    {userId && <Chip className="basket__cashback" size="sm" variant="soft" color="success">
                                        Кешбек з покупки : {totalCashback} грн.
                                    </Chip>}

                                    <Link to='/checkout' className='link' >
                                        <Button onClick={onClose} variant="solid" color="neutral" className="basket__button mainbutton" endDecorator={<LocalMallOutlinedIcon />}>ОФОРМИТИ ЗАМОВЛЕННЯ</Button>
                                    </Link>
                                </Stack>
                            </Container>
                        ) :
                        (
                            <Container sx={{ height: "80%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <LocalMallOutlinedIcon sx={{ fontSize: "95px", color: "rgba(0, 0, 0, 0.1)" }} />
                                <Typography variant="h5" sx={{ fontSize: "28px" }}>Цей кошик порожній.</Typography>
                                <Button2 variant="outlined" size="large" onClick={onClose} className='white-button'>
                                    <Link to="/shop" className='link'>КАТАЛОГ</Link>
                                </Button2>
                            </Container>
                        )
                    )
                }

            </Box>
        </Drawer >
    );
};

export { DrawerBasket };