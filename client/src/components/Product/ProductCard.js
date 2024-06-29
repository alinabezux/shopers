import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/joy/Card";
import { AspectRatio, Button, CardContent, CardOverflow, Chip } from "@mui/joy";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import img from '../../assets/test imge.png'
import Favorite from '@mui/icons-material/Favorite';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DoneIcon from '@mui/icons-material/Done';
import { productActions } from "../../redux";

const ProductCard = ({ product }) => {

    const dispatch = useDispatch();
    const { selectedProduct } = useSelector(state => state.productReducer);

    const handleShowDetails = useCallback((product) => {
        dispatch(productActions.setSelectedProduct(product));
        console.log(selectedProduct);

    }, [dispatch, product]);

    return (
        <Card className="product-card"
            onClick={() => handleShowDetails(product)}>
            {/*<Link href={`/product/${product._id}`}>*/}
            <AspectRatio ratio="1">
                <CardOverflow>
                    <img
                        src={img}
                        loading="lazy"
                        alt={product.name}
                    />
                </CardOverflow>
            </AspectRatio>

            <CardContent className="product-card__card-content">
                <Typography variant="h3" className="product-card__card-name">{product.name}</Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography className="product-card__card-price">{product.price} ₴</Typography>
                    <Stack direction="row" spacing={1}>
                        <FavoriteBorderIcon sx={{ fontSize: 20 }} />
                        {/*<FavoriteIcon sx={{fontSize: 20, color: "#730000"}}/>*/}
                        <LocalMallOutlinedIcon sx={{ fontSize: 20 }} />
                        {/*<DoneIcon sx={{fontSize: 20}}/>*/}
                    </Stack>
                </Stack>
                <Chip className="product-card__card-cashback" size="sm" variant="soft" color="success">
                    {product.cashback} грн. кешбек
                </Chip>
            </CardContent>
            {/*</Link>*/}
        </Card>
    );
}
    ;

export default ProductCard;