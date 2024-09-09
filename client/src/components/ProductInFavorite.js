import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/joy/Card";
import { Link } from "react-router-dom";

import { basketActions, favoriteActions, productActions } from '../redux';
import { DrawerBasket } from './DrawerBasket';
import { toUrlFriendly } from '../utils';

import { AspectRatio, CardContent, CardOverflow, Chip } from "@mui/joy";
import { Stack, Typography } from "@mui/material";
import NoPhotographyOutlinedIcon from '@mui/icons-material/NoPhotographyOutlined';
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";


const ProductInFavorite = ({ product }) => {
    const dispatch = useDispatch();

    const [openBasket, setOpenBasket] = useState(false);

    const { userId } = useSelector(state => state.authReducer);

    const handleShowDetails = useCallback((product) => {
        dispatch(productActions.setSelectedProduct(product));
    }, [dispatch]);

    const handleAddProductToBasket = useCallback(async (product) => {
        if (userId) {
            await dispatch(basketActions.addToBasket({ userId, productId: product._id }));
        }
        setOpenBasket(true);
    }, [userId, dispatch]);

    const handleDeleteProductFromFavorite = useCallback(async (product) => {
        if (userId) {
            await dispatch(favoriteActions.deleteFromFavorite({ userId, productId: product._id }))
        }
    }, [userId, dispatch])

    const stopPropagation = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }


    return (
        <>
            <Card className="product-card" sx={{ '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' } }}
                onClick={() => handleShowDetails(product)}>
                <Link className='link' to={`/product/${(toUrlFriendly(product?.name))}`} key={product._id} sx={{ zIndex: "1", }}>
                    <AspectRatio ratio="1">
                        <CardOverflow>
                            {
                                product?.images && product?.images.length > 0 ?
                                    <img src={product?.images[0]} alt={product?.name} /> :
                                    <NoPhotographyOutlinedIcon sx={{ fontSize: "95px", color: "rgba(0, 0, 0, 0.1)" }} />
                            }
                        </CardOverflow>
                    </AspectRatio>
                </Link>
                <CardContent className="product-card__card-content">
                    <Stack direction="column" spacing={1}>
                        <Typography variant="h3" className="product-card__card-name" >{product?.name}</Typography>
                        {product?.info?.color &&
                            <Typography className="product-card__card-color">{product.info.color}</Typography>
                        }
                        {product?.info?.size &&
                            <Typography className="product-card__card-color" sx={{ fontSize: "12px" }}>{product.info.size}</Typography>
                        }

                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography className="product-card__card-price">{product.price} ₴</Typography>
                            <Stack direction="row" spacing={1}>
                                <FavoriteIcon sx={{ color: '#730000' }} onClick={stopPropagation} onClickCapture={() => handleDeleteProductFromFavorite(product)} />
                                {product.quantity > 0 &&
                                    <LocalMallOutlinedIcon onClick={stopPropagation} onClickCapture={() => handleAddProductToBasket(product)} />
                                }
                            </Stack>
                        </Stack>
                        {product.quantity > 0 ?
                            <Chip className="product-card__card-cashback" size="sm" variant="soft" color="success">
                                {product.cashback} грн. кешбек
                            </Chip>
                            :
                            <Chip className="product-card__card-cashback" size="sm" variant="soft" color="danger">
                                Немає в наявності
                            </Chip>
                        }
                    </Stack>
                </CardContent>
            </Card>
            <DrawerBasket open={openBasket} onClose={() => setOpenBasket(false)} />

        </>

    );
};


export { ProductInFavorite };