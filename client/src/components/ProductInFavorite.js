import React, { useCallback, useState } from 'react';
import { useDispatch } from "react-redux";
import Card from "@mui/joy/Card";
import { AspectRatio, CardContent, CardOverflow, Chip } from "@mui/joy";
import { Stack, Typography } from "@mui/material";
import { ChipDelete } from '@mui/joy';
import NoPhotographyOutlinedIcon from '@mui/icons-material/NoPhotographyOutlined';

import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";

import { Link } from "react-router-dom";
import { basketActions, favoriteActions, productActions } from '../redux';
import useUser from '../hooks/useUser';
import { DrawerBasket } from './DrawerBasket';
import { toUrlFriendly } from '../utils';

const ProductInFavorite = ({ product }) => {
    const dispatch = useDispatch();

    const [openBasket, setOpenBasket] = useState(false);
    const userId = useUser();

    const handleShowDetails = useCallback((product) => {
        dispatch(productActions.setSelectedProduct(product));
    }, [dispatch, product]);

    const handleAddProductToBasket = useCallback(async (product) => {
        await dispatch(basketActions.addToBasket({ userId, productId: product._id }));
        await dispatch(basketActions.getBasket(userId));
        setOpenBasket(true);
    }, [userId, dispatch]);

    const handleDeleteProductFromFavorite = useCallback(async (product) => {
        await dispatch(favoriteActions.deleteFromFavorite({ userId, productId: product._id }))
        dispatch(favoriteActions.getFavorite(userId))

    }, [userId, dispatch])

    return (
        <>
            <Card className="accountpage__wishlist-card" sx={{ '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' } }}
                onClick={() => handleShowDetails(product)}>
                <Link className='link' to={`/product/${(toUrlFriendly(product.name))}`} key={product._id}>
                    <AspectRatio ratio="1">
                        <CardOverflow>
                            <ChipDelete onClick={() => handleDeleteProductFromFavorite(product)} sx={{ zIndex: "99", position: "absolute", top: 0, right: 0 }} />
                            {
                                product.images ?
                                    <img src={product.images[0]} alt={product.name} /> :
                                    <NoPhotographyOutlinedIcon sx={{ fontSize: "95px", color: "rgba(0, 0, 0, 0.1)" }} />
                            }
                        </CardOverflow>
                    </AspectRatio>
                </Link>
                <CardContent>
                    <Stack direction="column" spacing={1}>
                        <Typography className="accountpage__wishlist-title" variant="h5" >{product.name}</Typography>
                        <Typography className="accountpage__wishlist-color">Колір: {product.info.color}</Typography>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography className="accountpage__wishlist-price">{product.price} ₴</Typography>
                            <LocalMallOutlinedIcon  onClick={() => handleAddProductToBasket(product)} />
                            {/*<DoneIcon sx={{fontSize: 20}}/>*/}
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
            <DrawerBasket open={openBasket} onClose={() => setOpenBasket(false)} />
        </>

    );
};


export { ProductInFavorite };