import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from 'react-router-dom';

import { basketActions, productActions } from '../redux';
import { toUrlFriendly } from '../utils';

import Card from "@mui/joy/Card";
import { AspectRatio, Button, CardContent, Chip, ButtonGroup } from "@mui/joy";
import { Stack, Typography } from "@mui/material";
import { ChipDelete } from '@mui/joy';
import NoPhotographyOutlinedIcon from '@mui/icons-material/NoPhotographyOutlined';

const ProductInBasket = ({ product }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(product.quantity);
    const { userId } = useSelector(state => state.authReducer);

    const handleDeleteProductInBasket = useCallback(async (product) => {
        await dispatch(basketActions.deleteFromBasket({ userId, productId: product._id }))
    }, [userId, dispatch])

    const updateQuantityInBasket = useCallback(async (newQuantity) => {
        await dispatch(basketActions.updateProductInBasketQuantity({
            userId: userId,
            productId: product._id,
            quantity: newQuantity
        }))
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
    const handleShowDetails = useCallback((product) => {
        dispatch(productActions.setSelectedProduct(product));
    }, [dispatch]);


    return (
        <Card variant="plain" orientation="horizontal" size="sm" color="neutral" className="product-in-basket" >
            <Link to={`/product/${toUrlFriendly(product?.name || product?._product?.name)}`} className="link" onClick={() => handleShowDetails(product)}>
                <AspectRatio ratio="1" className="product-in-basket__card-image">
                    {product?.images && product?.images.length > 0 ? (
                        <img src={product?.images[0]} alt={product.name} />
                    ) : (
                        <NoPhotographyOutlinedIcon sx={{ fontSize: "95px", color: "rgba(0, 0, 0, 0.1)" }} />
                    )}
                </AspectRatio>
            </Link>
            <CardContent className="product-in-basket__card-content">
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Link to={`/product/${toUrlFriendly(product?.name || product?._product?.name)}`} className="link" onClick={() => handleShowDetails(product)}>
                        <Typography className="product-in-basket__card-name">{product.name}</Typography>
                    </Link>
                    <ChipDelete sx={{ minHeight: "0px" }} onClick={() => handleDeleteProductInBasket(product)} />
                </Stack>
                {product?.info?.color &&
                    <Typography className="product-in-basket__card-color">Колір: {product?.info?.color}</Typography>
                }
                {product?.info?.size &&
                    <Typography className="product-in-basket__card-color">Розмір: {product.info.size}</Typography>
                }
                <ButtonGroup className="product-in-basket__card-counter" size="small" variant='outlined' aria-label="outlined button group">
                    <Button className="product-in-basket__card-quantity" onClick={decreaseQuantity}> - </Button>
                    <Button className="product-in-basket__card-quantity">{product.quantity}</Button>
                    <Button className="product-in-basket__card-quantity" onClick={increaseQuantity}>+</Button>
                </ButtonGroup>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: '10px' }}>
                    <Typography className="product-in-basket__card-price">{product.quantity * product.price} грн.</Typography>
                    <Chip className="product-in-basket__card-cashback" size="sm" variant="soft" color="success">
                        {product.cashback} грн. кешбек
                    </Chip>
                </Stack>
            </CardContent>
        </Card>
    );
};

export { ProductInBasket };