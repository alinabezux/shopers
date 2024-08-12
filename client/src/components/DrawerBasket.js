import React from 'react';
import {
    Box,
    IconButton,
    Typography,
    Container,
    Stack
} from "@mui/material";
import Button2 from "@mui/material/Button";
import Button from '@mui/joy/Button';
import { Chip } from "@mui/joy";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import { ProductInBasket } from './ProductInBasket';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { basketActions } from '../redux/slices/basket.slice';

const BlackButton = styled(Button2)(() => ({
    color: 'black',
    backgroundColor: "transparent",
    '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: "white",
        border: "1px solid white"
    },
    margin: '15px',
    fontFamily: 'Geologica, sans-serif',
    fontWeight: '800',
    fontSize: '20px',
    border: "1px solid black",

}));



const DrawerBasket = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const { basket, loading, error } = useSelector(state => state.basketReducer);
    const { userId } = useSelector(state => state.authReducer);

    useEffect(() => {
        if (userId) {
            dispatch(basketActions.getBasket(userId));
        }
    }, [dispatch, userId, basket.length]); 
    


    const totalPrice = useMemo(() => {
        return basket.reduce((total, productInBasket) => {
            return total + productInBasket.price * productInBasket.quantity;
        }, 0);
    }, [basket]);

    const totalCashback = useMemo(() => {
        return basket.reduce((total, productInBasket) => {
            return total + productInBasket.cashback;
        }, 0);
    }, [basket]);

    return (
        <Drawer open={open} anchor="right">
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
                {userId !== null ?
                    <>
                        {basket.length !== 0 ?
                            <Container className='basket__content'>
                                <Box className='basket__products'>
                                    <Stack direction="column" spacing={2} alignItems="center">
                                        {basket.map(product => (
                                            <ProductInBasket key={product._id} product={product} />
                                        ))}
                                    </Stack>
                                </Box>
                                <Stack direction="column" className='basket__order'>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography className="basket__price">Разом :</Typography>
                                        <Typography className="basket__price">{totalPrice} грн.</Typography>
                                    </Stack>
                                    <Chip className="basket__cashback" size="sm" variant="soft" color="success">
                                        Кешбек з покупки : {totalCashback} грн.
                                    </Chip>
                                    <Link to='/checkout' className='link' >
                                        <Button onClick={onClose} variant="solid" color="neutral" className="basket__button" endDecorator={<LocalMallOutlinedIcon />}>ОФОРМИТИ ЗАМОВЛЕННЯ</Button>
                                    </Link>
                                </Stack>
                            </Container>
                            :
                            <Container sx={{ height: "80%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <LocalMallOutlinedIcon sx={{ fontSize: "95px", color: "rgba(0, 0, 0, 0.1)" }} />
                                <Typography variant="h5" sx={{ fontSize: "28px" }}>Цей кошик порожній.</Typography>
                                <BlackButton variant="outlined" size="large" onClick={onClose}>
                                    <Link to="/shop"
                                        style={{
                                            color: "inherit",
                                            textDecoration: "none"
                                        }}>КАТАЛОГ</Link>
                                </BlackButton>
                            </Container>
                        }
                    </>
                    :
                    <Container sx={{ height: "80%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 2 }}>
                        <LocalMallOutlinedIcon sx={{ fontSize: "95px", color: "rgba(0, 0, 0, 0.1)" }} />
                        <Link className='header_accout-icon link' to='/auth#logIn'>
                            <Button onClick={onClose} variant="solid" color="neutral" sx={{ mt: 1, width: "300px" }} type='submit'>УВІЙДІТЬ</Button>
                        </Link>
                        <Typography >щоб переглянути ваші продукти в корзині.</Typography>
                    </Container>
                }
            </Box>
        </Drawer >
    );
};

export { DrawerBasket };