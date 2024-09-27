import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { basketActions } from '../redux';

import Card from "@mui/joy/Card";
import { AspectRatio, Button, CardContent, Chip, ButtonGroup } from "@mui/joy";
import { Stack, Typography } from "@mui/material";
import { ChipDelete } from '@mui/joy';
import NoPhotographyOutlinedIcon from '@mui/icons-material/NoPhotographyOutlined';

const ProductInBasket = ({ productInBasket, onUpdateBasket, setOpenBasket }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(productInBasket.quantity);
    const { userId } = useSelector(state => state.authReducer);

    // Функція для видалення товару
    const handleDeleteProductInBasket = useCallback(async (productInBasket) => {
        if (userId) {
            await dispatch(basketActions.deleteFromBasket({ userId, productInBasketId: productInBasket._id }));
        } else {
            const currentBasket = JSON.parse(localStorage.getItem('basket')) || {}

            for (const key in currentBasket) {
                if (currentBasket[key].id === productInBasket.id) {
                    delete currentBasket[key]; // Видаляємо товар
                    break;
                }
            }

            localStorage.setItem('basket', JSON.stringify(currentBasket)); // Оновлюємо localStorage
            onUpdateBasket(currentBasket);
        }
    }, [userId, dispatch, onUpdateBasket]);

    // кількість
    const updateQuantityInBasket = useCallback(async (newQuantity) => {
        if (userId) {
            await dispatch(basketActions.updateProductInBasketQuantity({
                userId: userId,
                productInBasketId: productInBasket._id,
                quantity: newQuantity
            }))
        } else {
            const currentBasket = JSON.parse(localStorage.getItem('basket')) || {};
            for (const key in currentBasket) {
                if (currentBasket[key].id === productInBasket.id) {
                    currentBasket[key].quantity = newQuantity;
                    break;
                }
            }

            localStorage.setItem('basket', JSON.stringify(currentBasket)); // Оновлюємо localStorage
            onUpdateBasket(currentBasket);
        }
    }, [dispatch, productInBasket, userId, onUpdateBasket])


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
            handleDeleteProductInBasket(productInBasket);
        }
    }

    // const handleShowDetails = useCallback((productInBasket) => {
    //     dispatch(productActions.setSelectedProduct(productInBasket.productId));
    //     setOpenBasket()
    // }, [dispatch, setOpenBasket]);

    return (
        <Card variant="plain" orientation="horizontal" size="sm" color="neutral" className="product-in-basket" >
            {/* <Link key={productInBasket.productId} to={`/product/${toUrlFriendly(productInBasket?.name || productInBasket?._product?.name)}`} className="link" onClick={() => handleShowDetails(productInBasket)}> */}
            <AspectRatio ratio="1" className="product-in-basket__card-image">
                {productInBasket?.images && productInBasket?.images.length > 0 ? (
                    <img src={productInBasket?.images[0]} alt={productInBasket.name} />
                ) : (
                    <NoPhotographyOutlinedIcon sx={{ fontSize: "95px", color: "rgba(0, 0, 0, 0.1)" }} />
                )}
            </AspectRatio>
            {/* </Link> */}
            <CardContent className="product-in-basket__card-content">
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    {/* <Link to={`/product/${toUrlFriendly(productInBasket?.name || productInBasket?._product?.name)}`} className="link" onClick={() => handleShowDetails(productInBasket)}> */}
                    <Typography className="product-in-basket__card-name">{productInBasket.name}</Typography>
                    {/* </Link> */}
                    <ChipDelete sx={{ minHeight: "0px" }} onClick={() => handleDeleteProductInBasket(productInBasket)} />
                </Stack>
                {productInBasket?.info?.color &&
                    <Typography className="product-in-basket__card-color">Колір: {productInBasket?.info?.color}</Typography>
                }
                {productInBasket?.size &&
                    <Typography className="product-in-basket__card-color">Розмір: {productInBasket.size}</Typography>
                }
                <ButtonGroup className="product-in-basket__card-counter" size="sm" variant='outlined' aria-label="outlined button group">
                    <Button className="product-in-basket__card-quantity" onClick={decreaseQuantity}> - </Button>
                    <Button className="product-in-basket__card-quantity">{productInBasket.quantity}</Button>
                    <Button className="product-in-basket__card-quantity" onClick={increaseQuantity}>+</Button>
                </ButtonGroup>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: '10px' }}>
                    <Typography className="product-in-basket__card-price">{productInBasket.quantity * productInBasket.price} грн.</Typography>
                    {userId && <Chip className="product-in-basket__card-cashback" size="sm" variant="soft" color="success">
                        {productInBasket.cashback} грн. кешбек
                    </Chip>}
                </Stack>
            </CardContent>
        </Card>
    );
};

export { ProductInBasket };