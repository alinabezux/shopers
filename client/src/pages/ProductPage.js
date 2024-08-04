import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { toUrlFriendly } from '../utils'

import { Typography, Box, Stack } from '@mui/material';
import { Button, Chip, ButtonGroup, AspectRatio } from "@mui/joy";
import { Container } from '@mui/joy';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { basketActions, favoriteActions } from '../redux';
import useUser from '../hooks/useUser';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Snackbar from '@mui/joy/Snackbar';
import { DrawerBasket } from '../components';

const ProductPage = () => {
    const [openBasket, setOpenBasket] = useState(false);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [favourite, setFavourite] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');


    const userId = useUser();
    const dispatch = useDispatch();

    const { selectedProduct } = useSelector(state => state.productReducer);
    const { categories } = useSelector(state => state.categoryReducer);
    const { types } = useSelector(state => state.typeReducer);
    const { favorite, loading, error } = useSelector(state => state.favoriteReducer);

    const category = categories.find(category => category._id === selectedProduct._category);
    const type = types.find(type => type._id === selectedProduct._type);

    console.log(selectedProduct)
    useEffect(() => {
        if (userId) {
            dispatch(favoriteActions.getFavorite(userId))
        }
    }, [dispatch, userId])

    useEffect(() => {
        if (favorite) {
            const isFavourite = favorite.some(item => item._id === selectedProduct._id);
            setFavourite(isFavourite);
        }
    }, [favorite, selectedProduct._id]);

    const handleAddProductToFavourite = useCallback(async (product) => {
        await dispatch(favoriteActions.addToFavorite({ userId, productId: product._id }));
        await dispatch(favoriteActions.getFavorite(userId))
        setSnackbarMessage(`${product.name} додано у список бажань.`);
        setOpenSnackbar(true)
    }, [userId, dispatch]);


    const handleDeleteProductFromFavorite = useCallback(async (product) => {
        await dispatch(favoriteActions.deleteFromFavorite({ userId, productId: product._id }))
        await dispatch(favoriteActions.getFavorite(userId))
        setSnackbarMessage(`${product.name} видалено зі списку бажань.`);
        setOpenSnackbar(true)
    }, [userId, dispatch])

    const handleAddProductToBasket = useCallback(async (product) => {
        await dispatch(basketActions.addToBasket({ userId, productId: product._id }));
        await dispatch(basketActions.getBasket(userId));
        setOpenBasket(true);
    }, [userId, dispatch]);

    return (
        <Container className="product-page">
            {category && type ?
                (<Breadcrumbs className='product-page__breadrumbs'
                    separator={<NavigateNextIcon fontSize='small' />}
                    aria-label="breadcrumb"
                >
                    <NavLink className="link product-page__breadrumb" underline="hover" key="1" to="/" >
                        Головна
                    </NavLink>
                    <NavLink className="link product-page__breadrumb" underline="hover" key="1" to={`/${(toUrlFriendly(category.name))}`} >
                        {category.name}
                    </NavLink>
                    <NavLink className="link product-page__breadrumb" underline="hover" key="1" to={`/${(toUrlFriendly(category.name))}/${(toUrlFriendly(type.name))}`} >
                        {type.name}
                    </NavLink>
                    <Typography sx={{ color: "black" }}>{selectedProduct.name}</Typography>
                </Breadcrumbs>)
                : null
            }

            <Box className="product-page__content">
                <Box className="product-page__gallery">
                    <AspectRatio ratio="1" >
                        <Swiper
                            spaceBetween={10}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2"
                        >
                            {selectedProduct.images.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={image}
                                        alt={`Slide ${index}`}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </AspectRatio>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper"
                    >
                        {selectedProduct.images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <AspectRatio ratio="1" >
                                    <img
                                        src={image}
                                        alt={`Slide ${index}`}
                                    />
                                </AspectRatio>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
                <Box>
                    <Stack direction="column" spacing={1} className="product-page__info">
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h4" className="product-page__name">{selectedProduct.name}</Typography>
                            {
                                favourite ? <FavoriteIcon className="product-page__heart-icon" sx={{ color: '#730000', fontSize: "35px" }} onClick={() => handleDeleteProductFromFavorite(selectedProduct)} /> :
                                    <FavoriteBorderIcon sx={{ fontSize: "35px" }} className="product-page__heart-icon" onClick={() => handleAddProductToFavourite(selectedProduct)} />
                            }

                        </Stack>

                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="h5" className="product-page__price">{selectedProduct.price} грн.</Typography>
                            <Chip className="product-page__cashback" size="md" variant="soft" color="success" >
                                {selectedProduct.cashback} грн. кешбек
                            </Chip>
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center" >
                            <ButtonGroup className="product-page__counter" variant='outlined' aria-label="outlined button group">
                                <Button className="product-page__quantity"> - </Button>
                                <Button className="product-page__quantity">{selectedProduct.quantity}</Button>
                                <Button className="product-page__quantity">+</Button>
                            </ButtonGroup>
                            <Button variant="solid" color="neutral" className="product-page__button" endDecorator={<LocalMallOutlinedIcon />} onClick={() => handleAddProductToBasket(selectedProduct)}>ДОДАТИ В КОШИК</Button>
                        </Stack>
                        <Chip className="product-page__cashback" size="md" variant="soft" color="danger">
                            {selectedProduct.quantity} в наявності
                        </Chip>
                        <br />
                        {/* <br /> */}
                        <Typography className="product-page__color"><b style={{ color: "black" }}>Колір: </b>{selectedProduct?.info?.color}</Typography>
                        <Typography className="product-page__size"><b style={{ color: "black" }}>Розмір: </b>{selectedProduct?.info?.size}</Typography>
                        <Typography className="product-page__material">
                            {selectedProduct?.info?.material ? <><b style={{ color: "black" }}>Матеріал: </b>{selectedProduct.info.material}</> : null}
                        </Typography>
                        <Typography variant="h5" className="product-page__description" sx={{ color: "black", fontSize: "18px" }}>{selectedProduct?.info?.description}</Typography>
                    </Stack>
                </Box>
            </Box>
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
            <DrawerBasket open={openBasket} onClose={() => setOpenBasket(false)} />

        </Container>
    );
};

export { ProductPage };