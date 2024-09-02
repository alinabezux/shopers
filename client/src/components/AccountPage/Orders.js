import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { orderActions } from '../../redux';

import Button2 from "@mui/material/Button";
import {
    Box,
    Container,
    Typography,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { AspectRatio, Card, CardContent, Chip, Stack } from '@mui/joy';
import NoPhotographyOutlined from '@mui/icons-material/NoPhotographyOutlined';


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
const Orders = () => {
    const dispatch = useDispatch();
    const { userOrders } = useSelector(state => state.orderReducer)
    const { userId } = useSelector(state => state.authReducer);

    useEffect(() => {
        if (userId) {
            dispatch(orderActions.getUserOrders(userId));
        }
    }, [dispatch, userId, userOrders.length]);

    return (
        <Box sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            {userOrders.length ?
                <Box sx={{ width: "100%" }}>
                    <Stack direction="column" spacing={2} >
                        {userOrders.map(order =>
                        (<Card variant="plain" size="sm" color="neutral" >
                            <CardContent >
                                <Typography >{order.orderID}</Typography>
                                <Typography >{order.createdAt}</Typography>
                                {order.orderItems.map(item => (
                                    <Card orientation="horizontal" variant="soft">
                                        <AspectRatio ratio="1" sx={{ width: "20%" }}>
                                            {item?.img ? (
                                                <img src={item.img} alt={item.name} />
                                            ) : (
                                                <NoPhotographyOutlined sx={{ fontSize: "95px", color: "rgba(0, 0, 0, 0.1)" }} />
                                            )}
                                        </AspectRatio>
                                        <CardContent >
                                            <Typography >{item.name}</Typography>
                                            <Typography >{item.quantity}</Typography>
                                            <Typography >{item.price}</Typography>
                                            <Typography >{item?.info?.color}</Typography>
                                            <Typography >{item?.info?.size}</Typography>
                                        </CardContent>

                                    </Card>
                                ))}

                                <Typography >{order.firstName} {order.lastName}</Typography>
                                <Typography >{order.phoneNumber}</Typography>
                                <Typography >{order.city.description}</Typography>
                                <Typography >№{order.warehouse.number}</Typography>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography>{order.totalSum} грн.</Typography>
                                    <Chip size="sm" variant="soft" color="success">
                                        {order.cashback} грн. кешбек
                                    </Chip>
                                </Stack>
                                <Typography >{order.paymentMethod}</Typography>
                            </CardContent>
                        </Card>)
                        )}
                    </Stack>
                </Box>
                :
                <Box>
                    <LocalMallOutlinedIcon sx={{ fontSize: "95px", color: "rgba(0, 0, 0, 0.1)" }} />
                    <Typography variant="h5" sx={{ fontSize: "28px" }}>У вас ще не було замовлень.</Typography>
                    <BlackButton variant="outlined" size="large">
                        <Link to="/shop"
                            style={{
                                color: "inherit",
                                textDecoration: "none"
                            }}>КАТАЛОГ</Link>
                    </BlackButton>
                </Box>
            }



        </Box>
    );
};

export { Orders };