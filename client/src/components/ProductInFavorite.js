import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/joy/Card";
import { AspectRatio, CardContent, CardOverflow } from "@mui/joy";
import { Stack, Typography } from "@mui/material";
import NoPhotographyOutlinedIcon from '@mui/icons-material/NoPhotographyOutlined';
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";

import { Link } from "react-router-dom";
import { basketActions, favoriteActions, productActions } from '../redux';
import { DrawerBasket } from './DrawerBasket';
import { toUrlFriendly } from '../utils';

const ProductInFavorite = ({ product }) => {
    const dispatch = useDispatch();

    const [openBasket, setOpenBasket] = useState(false);
    const [favourite, setFavourite] = useState(false);

    const { userId } = useSelector(state => state.authReducer);


    const handleShowDetails = useCallback((product) => {
        dispatch(productActions.setSelectedProduct(product));
    }, [dispatch, product]);

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

    return (
        <>
            <Card className="accountpage__wishlist-card" sx={{ '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' } }}
                onClick={() => handleShowDetails(product)}>
                <Link className='link' to={`/product/${(toUrlFriendly(product.name))}`} key={product._id} sx={{ zIndex: "1", }}>
                    <AspectRatio ratio="1">
                        <CardOverflow>
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
                        <Typography className="accountpage__wishlist-color">Колір: {product?.info?.color}</Typography>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography className="accountpage__wishlist-price">{product.price} ₴</Typography>
                            <Stack direction="row" spacing={1}>
                                <FavoriteIcon sx={{ color: '#730000' }} onClick={() => handleDeleteProductFromFavorite(product)} />
                                <LocalMallOutlinedIcon onClick={() => handleAddProductToBasket(product)} />
                                {/*<DoneIcon sx={{fontSize: 20}}/>*/}
                            </Stack>

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