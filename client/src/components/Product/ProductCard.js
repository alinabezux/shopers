import React from 'react';
import {useDispatch} from "react-redux";
import Card from "@mui/joy/Card";
import {AspectRatio, Button, CardContent, CardOverflow, Chip} from "@mui/joy";
import {Box, IconButton, Stack, Typography} from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import img from '../../assets/test imge.png'
import Favorite from '@mui/icons-material/Favorite';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DoneIcon from '@mui/icons-material/Done';

const ProductCard = ({product}) => {

    const dispatch = useDispatch();

    return (
        <Card sx={{width: {xs: '30%', md: '20%'}}}>
            <AspectRatio
                ratio="1"
                sx={{
                    width: "100%",
                }}
            >
                <CardOverflow>
                    <img
                        src={img}
                        loading="lazy"
                        alt={product.name}
                    />

                </CardOverflow>
            </AspectRatio>

            <CardContent>
                <Typography variant="h3"
                            sx={{
                                fontWeight: "500",
                                fontSize: "18px",
                                fontFamily: "Geologica, sans-serif",
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                >{product.name}</Typography>
                <Stack direction="row" justifyContent="space-between"
                       alignItems="center">
                    <Typography
                        sx={{my: 1, fontWeight: '400', fontSize: "18px", fontFamily: "Geologica, sans-serif"}}
                    >
                        {product.price} ₴
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <FavoriteBorderIcon sx={{fontSize: 20}}/>
                        {/*<FavoriteIcon sx={{fontSize: 20, color: "#730000"}}/>*/}
                        <LocalMallOutlinedIcon sx={{fontSize: 20}}/>
                        {/*<DoneIcon sx={{fontSize: 20}}/>*/}
                    </Stack>
                </Stack>
                <Chip size="sm" variant="soft" color="success"
                      sx={{fontWeight: '400', fontFamily: "Geologica, sans-serif"}}>
                    {product.cashback} грн. кешбек
                </Chip>

            </CardContent>

        </Card>
    );
};

export default ProductCard;