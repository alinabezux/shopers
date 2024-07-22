import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/joy/Card";
import { AspectRatio, Button, CardContent, Chip, ButtonGroup } from "@mui/joy";
import { Stack, Typography } from "@mui/material";
import { ChipDelete } from '@mui/joy';
import { authService } from '../services/auth.service';
import NoPhotographyOutlinedIcon from '@mui/icons-material/NoPhotographyOutlined';
import { basketActions } from '../redux';

const ProductInBasket = ({ product }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(product.quantity);
    
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const userId = authService.getUser();
        if (userId) {
            setUserId(userId);
        }
    }, [])

    const handleDeleteProductInBasket = useCallback(async (product) => {
        await dispatch(basketActions.deleteFromBasket({ userId, productId: product._id }))
        await dispatch(basketActions.getBasket(userId))
    }, [userId, dispatch])

    const updateQuantityInBasket = useCallback(async (newQuantity) => {
        await dispatch(basketActions.updateProductInBasketQuantity({
            userId: userId,
            productId: product._id,
            quantity: newQuantity
        }))
        dispatch(basketActions.getBasket(userId));
    }, [dispatch, product._id, userId])


    const increaseQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateQuantityInBasket(newQuantity);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updateQuantityInBasket(newQuantity);
        } else {
            handleDeleteProductInBasket(product);
        }
    }

    return (
        <Card variant="plain" orientation="horizontal" size="sm" color="neutral" className="product-in-basket">
            <AspectRatio ratio="1" className="product-in-basket__card-image">
                {
                    product.images ?
                        <img src={product.images[0]} alt={product.name} /> :
                        <NoPhotographyOutlinedIcon sx={{ fontSize: "95px", color: "rgba(0, 0, 0, 0.1)" }} />
                }
            </AspectRatio>
            <CardContent className="product-in-basket__card-content">
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Typography className="product-in-basket__card-name">{product.name}</Typography>
                    <ChipDelete onClick={() => handleDeleteProductInBasket(product)} />
                </Stack>

                <Typography className="product-in-basket__card-color">Колір: {product.info.color}</Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography className="product-in-basket__card-price">{product.price} грн.</Typography>
                    <Chip className="product-in-basket__card-cashback" size="sm" variant="soft" color="success">
                        {product.cashback} грн. кешбек
                    </Chip>
                </Stack>
                <ButtonGroup className="product-in-basket__card-counter" size="small" variant='outlined' aria-label="outlined button group">
                    <Button className="product-in-basket__card-quantity" onClick={decreaseQuantity}> - </Button>
                    <Button className="product-in-basket__card-quantity">{product.quantity}</Button>
                    <Button className="product-in-basket__card-quantity" onClick={increaseQuantity}>+</Button>
                </ButtonGroup>
            </CardContent>
        </Card>
    );
};

export { ProductInBasket };