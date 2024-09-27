import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { orderActions } from '../../redux';

import {
    Box,
    Button,
    CircularProgress,
    Typography,
} from "@mui/material";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { AspectRatio, Card, CardContent, Chip, Stack } from '@mui/joy';
import NoPhotographyOutlined from '@mui/icons-material/NoPhotographyOutlined';

const Orders = () => {
    const dispatch = useDispatch();
    const { userOrders, loading } = useSelector(state => state.orderReducer)
    const { userId } = useSelector(state => state.authReducer);

    useEffect(() => {
        if (userId) {
            dispatch(orderActions.getUserOrders(userId));
        }
    }, [dispatch, userId]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress color="inherit" />
            </Box>
        );
    }

    return (
        <Box className="orders" sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            {userOrders.length ?
                <Box sx={{ width: "100%" }}>
                    <Stack direction="column" spacing={2} >
                        {userOrders.map(order =>
                        (<Card variant="plain" size="sm" color="neutral" key={order.orderID}>
                            <CardContent >
                                <Typography variant="h3" className="product-card__card-name">{order.orderID}</Typography>
                                <Typography className="product-card__card-color">Дата покупки: {order.createdAt.split('T')[0].split('-').reverse().join('.')}</Typography>
                                {order.orderItems.map(item => (
                                    <Card orientation="horizontal" variant="soft" sx={{ my: 1 }} key={item._productId}>
                                        <AspectRatio ratio="1" sx={{ width: "20%" }}>
                                            {item?.img ? (
                                                <img src={item.img} alt={item.name} />
                                            ) : (
                                                <NoPhotographyOutlined sx={{ fontSize: "95px", color: "rgba(0, 0, 0, 0.1)" }} />
                                            )}
                                        </AspectRatio>
                                        <CardContent >
                                            <Typography variant="h3" className="product-card__card-name">{item.name}</Typography>
                                            <Typography className="product-card__card-price">{item.price} грн.</Typography>
                                            {item?.color && <Typography className="product-card__card-color">Колір: {item.color}</Typography>}
                                            {item?.size && <Typography className="product-card__card-color">Розмір: {item.size}</Typography>}
                                            <Typography className="product-card__card-price">{item.quantity} шт.</Typography>
                                        </CardContent>

                                    </Card>
                                ))}
                                <Typography variant="h3" className="product-card__card-name">Дані замовлення:</Typography>
                                <Typography className="product-card__card-color">{order.firstName} {order.lastName}</Typography>
                                <Typography className="product-card__card-color">{order.phoneNumber}</Typography>

                                {order.city ?
                                    <>
                                        <Typography className="product-card__card-color">{order.city.description}</Typography>
                                        <Typography className="product-card__card-color">№{order.warehouse.number}</Typography>
                                    </>
                                    :
                                    <>
                                        <Typography className="product-card__card-color">{order.cityUKR}</Typography>
                                        <Typography className="product-card__card-color">{order.index}</Typography>
                                        <Typography className="product-card__card-color">{order.region.label}</Typography>
                                    </>
                                }

                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h3" className="product-card__card-name">{order.totalSum} грн.</Typography>
                                    <Chip size="sm" variant="soft" color="success">
                                        {order.cashback} грн. кешбек
                                    </Chip>
                                </Stack>
                            </CardContent>
                        </Card>)
                        )}
                    </Stack>
                </Box>
                :
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <LocalMallOutlinedIcon sx={{ fontSize: "95px", color: "rgba(0, 0, 0, 0.1)" }} />
                    <Typography variant="h5" sx={{ fontSize: "28px", textAlign: "center" }}>У вас ще не було замовлень.</Typography>
                    <Button variant="outlined" size="large" className="white-button">
                        <Link to="/shop"
                            style={{
                                color: "inherit",
                                textDecoration: "none"
                            }}>КАТАЛОГ</Link>
                    </Button>
                </Box>
            }
        </Box>
    );
};

export { Orders };