import React, { useCallback, useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { favoriteActions, productActions } from "../../redux";
import { toUrlFriendly } from '../../utils';
import { DrawerBasket } from '../DrawerBasket';

import Card from "@mui/joy/Card";
import { AspectRatio, CardContent, CardOverflow, Chip } from "@mui/joy";
import { Stack, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NoPhotographyOutlinedIcon from '@mui/icons-material/NoPhotographyOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import Snackbar from '@mui/joy/Snackbar';

const ProductCard = memo(({ product }) => {
    const dispatch = useDispatch();

    const [openBasket, setOpenBasket] = useState(false);
    const [favourite, setFavourite] = useState(false);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const { favorite } = useSelector(state => state.favoriteReducer);
    const { userId } = useSelector(state => state.authReducer);

    useEffect(() => {
        if (userId) {
            dispatch(favoriteActions.getFavorite(userId))
        }
    }, [dispatch, userId, favorite.length])

    useEffect(() => {
        if (favorite) {
            const isFavourite = favorite.some(item => item._id === product._id);
            setFavourite(isFavourite);
        }
    }, [favorite, product._id, favorite.length]);

    const handleShowDetails = useCallback((product) => {
        dispatch(productActions.setSelectedProduct(product));
    }, [dispatch]);

    const handleAddProductToFavourite = useCallback(async (product) => {
        if (userId) {
            const res = await dispatch(favoriteActions.addToFavorite({ userId, productId: product._id }));

            if (res.meta.requestStatus === 'fulfilled') {
                setSnackbarMessage(`${product.name} додано у список бажань.`);
                setOpenSnackbar(true)
                setFavourite(true)
            }
        } else {
            setOpenErrorSnackbar(true)
        }

    }, [dispatch, userId]);


    const handleDeleteProductFromFavorite = useCallback(async (product) => {
        await dispatch(favoriteActions.deleteFromFavorite({ userId: userId, productId: product._id }))
        setSnackbarMessage(`${product.name} видалено зі списку бажань.`);
        setFavourite(false)
        setOpenSnackbar(true)
    }, [userId, dispatch])


    const stopPropagation = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    return (
        <>
            <Card className="product-card" data-product-name={product.name} data-product-url={`/product/${(toUrlFriendly(product.name))}`} sx={{ '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' } }}
                onClick={() => handleShowDetails(product)}>
                <Link className='link' to={`/product/${(toUrlFriendly(product.name))}`} key={product._id}>
                    <AspectRatio ratio="1">
                        <CardOverflow>
                            {product.discount > 0 ?
                                <Chip
                                    variant="solid"
                                    color="danger"
                                    sx={{
                                        position: "absolute",
                                        top: 8,
                                        right: 8,
                                        zIndex: 2,
                                    }}
                                >-{product.discount} %</Chip>
                                : null
                            }
                            {
                                product.images.length !== 0 ?
                                    <img src={product.images[0]} alt={product.name} loading="lazy" /> :
                                    <NoPhotographyOutlinedIcon sx={{ fontSize: "95px", color: "rgba(0, 0, 0, 0.1)" }} />
                            }
                        </CardOverflow>
                    </AspectRatio>
                    <CardContent className="product-card__card-content">
                        <Stack direction="column" spacing={1}>
                            <Typography variant="h3" className="product-card__card-name">{product.name}</Typography>
                            {product?.info?.color &&
                                <Typography className="product-card__card-color">{product.info.color}</Typography>
                            }
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                {product.discount > 0 ?
                                    <Stack direction="column">
                                        <Typography sx={{ textDecoration: "line-through", fontSize: "12px" }} >{product.price} ₴</Typography>
                                        <Chip variant="soft" size='md' color="danger"  >{product.price - product.price / 100 * product.discount} ₴</Chip>
                                    </Stack>
                                    : <Typography className="product-card__card-price">{product.price} ₴</Typography>
                                }

                                <Stack direction="row" spacing={1}>
                                    {
                                        favourite ?
                                            <FavoriteIcon sx={{ color: '#730000' }}
                                                onClick={(e) => {
                                                    stopPropagation(e);
                                                    handleDeleteProductFromFavorite(product)
                                                }} />
                                            :
                                            <FavoriteBorderIcon onClick={(e) => {
                                                stopPropagation(e);
                                                handleAddProductToFavourite(product)
                                            }}
                                            />
                                    }
                                    {product.quantity > 0 && <LocalMallOutlinedIcon />}
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
                </Link>
            </Card >
            <DrawerBasket open={openBasket} onClose={() => setOpenBasket(false)} />
            <Snackbar
                startDecorator={<FavoriteIcon sx={{ fontSize: 20 }} />}
                autoHideDuration={3000}
                open={openSnackbar}
                color="neutral"
                variant="plain"
                sx={{ top: "70px" }}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                size="lg"
                onClose={(event, reason) => {
                    if (reason === 'clickaway') {
                        return;
                    }
                    setOpenSnackbar(false);
                }}
            >
                <Typography>
                    {snackbarMessage}
                </Typography>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                startDecorator={<AccountCircleRoundedIcon />}
                color="warning" size="lg" variant="soft"
                autoHideDuration={3000}
                open={openErrorSnackbar}
                onClose={(event, reason) => {
                    if (reason === 'clickaway') {
                        return;
                    }
                    setOpenErrorSnackbar(false);
                }}
            >
                <Link to='/auth#logIn' className='link' sx={{ margin: 0, p: 0, textAlign: "center" }} ><b>Увійдіть</b></Link>щоб додати до списку бажань.
            </Snackbar>
        </>
    );
});

export default ProductCard;