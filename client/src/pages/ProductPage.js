import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { ObjectId } from 'bson'

import { Typography, Box, Stack, CircularProgress } from '@mui/material';
import { Button, Chip, ButtonGroup, AspectRatio, Select, Option } from "@mui/joy";
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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Snackbar from '@mui/joy/Snackbar';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

import { basketActions, favoriteActions, productActions } from '../redux';
import { DrawerBasket } from '../components';
import { toUrlFriendly } from '../utils'
import { ErrorPage } from './ErrorPage';

const ProductPage = () => {
    const [openBasket, setOpenBasket] = useState(false);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [favourite, setFavourite] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("");
    // const [localBasket, setLocalBasket] = useState(() => JSON.parse(localStorage.getItem('basket')) || {});

    const dispatch = useDispatch();

    const { userId } = useSelector(state => state.authReducer);
    const { basket } = useSelector(state => state.basketReducer);
    const { selectedProduct, loading, error } = useSelector(state => state.productReducer);
    const { categories } = useSelector(state => state.categoryReducer);
    const { types } = useSelector(state => state.typeReducer);
    const { favorite } = useSelector(state => state.favoriteReducer);

    const category = useMemo(() => categories.find(category => category._id === product._category), [categories, product._category]);
    const type = useMemo(() => types.find(type => type._id === product._type), [types, product._type]);

    useEffect(() => {
        const savedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

        if (savedProduct && Object.keys(selectedProduct).length === 0) {
            setProduct(savedProduct);
            dispatch(productActions.setSelectedProduct(savedProduct));
        } else if (selectedProduct) {
            setProduct(selectedProduct);
        }
    }, [dispatch, selectedProduct]);


    useEffect(() => {
        if (userId) {
            dispatch(favoriteActions.getFavorite(userId))
        }
    }, [dispatch, userId, favorite.length])


    useEffect(() => {
        setFavourite(favorite.some(item => item._id === product._id));
    }, [favorite, product._id]);


    const increaseQuantity = useCallback(() => {
        if (quantity < product.quantity) {
            setQuantity(prevQuantity => prevQuantity + 1);
        }
    }, [quantity, product.quantity]);

    const decreaseQuantity = useCallback(() => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    }, [quantity]);


    const handleAddProductToFavourite = useCallback(async (product) => {
        if (userId) {
            await dispatch(favoriteActions.addToFavorite({ userId, productId: product._id }));
            setSnackbarMessage(`${product.name} додано у список бажань.`);
            setOpenSnackbar(true)
        } else {
            setSnackbarMessage(
                <>
                    <Link to="/auth#logIn" className="link" style={{ margin: 0, padding: 0, textAlign: "center" }}>
                        <b>Увійдіть </b>
                    </Link>
                    щоб додати до списку бажань.
                </>
            );
            setOpenErrorSnackbar(true)
        }
    }, [userId, dispatch]);

    const handleDeleteProductFromFavorite = useCallback(async (product) => {
        await dispatch(favoriteActions.deleteFromFavorite({ userId, productId: product._id }))
        setSnackbarMessage(`${product.name} видалено зі списку бажань.`);

        setOpenSnackbar(true)
    }, [userId, dispatch])

    const handleAddProductToBasket = useCallback(async (product) => {
        const sizeString = product.info.size || '';
        const sizeOptions = sizeString.split(',').map(s => s.trim());

        const addProductToLocalBasket = (product, quantity, size) => {
            const currentBasket = JSON.parse(localStorage.getItem('basket')) || {};
            let isProductUpdated = false;

            for (const key in currentBasket) {
                if (currentBasket[key]._id === product._id && currentBasket[key].size === size) {
                    currentBasket[key].quantity += quantity;
                    isProductUpdated = true;
                    break;
                }
            }
            if (!isProductUpdated) {
                const newId = new ObjectId();
                currentBasket[newId.toString()] = {
                    id: newId.toString(),
                    ...product,
                    quantity,
                    size: size || undefined
                };
            }

            localStorage.setItem('basket', JSON.stringify(currentBasket));
            // setLocalBasket(currentBasket);
            setOpenBasket(true);
        };

        const validateSize = () => {
            if (sizeOptions.length > 1 && !size) {
                setSnackbarMessage('Виберіть розмір, будь ласка!');
                setOpenErrorSnackbar(true);
                return false;
            }
            return true;
        };

        if (userId) {
            if (validateSize()) {
                const sizePayload = sizeOptions.length > 1 ? { size } : {};

                const existingProduct = sizeOptions.length > 1 ?
                    basket.find(item => item.productId === product._id && item.size === size) :
                    basket.find(item => item.productId === product._id)

                if (existingProduct) {
                    await dispatch(basketActions.updateProductInBasketQuantity({
                        userId,
                        productInBasketId: existingProduct._id,
                        quantity: existingProduct.quantity + quantity
                    }))
                } else {
                    await dispatch(basketActions.addToBasket({
                        userId,
                        productId: product._id,
                        quantity,
                        ...sizePayload
                    }));
                }
                setOpenBasket(true);
            }
        } else {
            if (validateSize()) {
                addProductToLocalBasket(product, quantity, sizeOptions.length > 1 ? size : undefined);
            }
        }
    }, [userId, dispatch, quantity, size, basket]);


    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress color="inherit" />
            </Box>
        );
    }

    if (error) {
        return <ErrorPage message={error.message || 'Щось пішло не так...'} />;
    }

    return (
        <Container className="product-page">
            {category ?
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
                    {
                        type?.name &&
                        <NavLink className="link product-page__breadrumb" underline="hover" key="1" to={`/${(toUrlFriendly(category.name))}/${(toUrlFriendly(type.name))}`} >
                            {type.name}
                        </NavLink>
                    }
                    <Typography sx={{ color: "black" }}>{product.name}</Typography>
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
                            {(product.images || []).map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img src={image} alt={`Slide ${index}`} loading="lazy" />
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
                        {(product.images || []).map((image, index) => (
                            <SwiperSlide key={index}>
                                <AspectRatio ratio="1" >
                                    <img
                                        src={image}
                                        alt={`Slide ${index}`}
                                        loading="lazy"
                                    />
                                </AspectRatio>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
                <Box className="product-page__info__box">
                    <Stack direction="column" spacing={1} className="product-page__info">
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h5" className="product-page__name">{product.name}</Typography>
                            {
                                favourite ? <FavoriteIcon className="product-page__heart-icon" sx={{ color: '#730000', fontSize: "35px" }} onClick={() => handleDeleteProductFromFavorite(product)} /> :
                                    <FavoriteBorderIcon sx={{ fontSize: "35px" }} className="product-page__heart-icon" onClick={() => handleAddProductToFavourite(product)} />
                            }

                        </Stack>

                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="h5" className="product-page__price">{product.price} грн.</Typography>
                            <Chip className="product-page__cashback" size="md" variant="soft" color="success" >
                                {product.cashback} грн. кешбек
                            </Chip>
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center" >
                            <ButtonGroup disabled={product.quantity <= 0} className="product-page__counter" variant='outlined' aria-label="outlined button group">
                                <Button className="product-page__quantity" onClick={decreaseQuantity}> - </Button>
                                <Button className="product-page__quantity">{quantity}</Button>
                                <Button className="product-page__quantity" onClick={increaseQuantity}>+</Button>
                            </ButtonGroup>
                            <Button disabled={product.quantity <= 0} variant="solid" color="neutral" className="product-page__button mainbutton" endDecorator={<LocalMallOutlinedIcon />} onClick={() => handleAddProductToBasket(product)}>ДОДАТИ В КОШИК</Button>
                        </Stack>
                        {product.quantity > 0 ?
                            <Chip className="product-page__cashback" size="md" variant="soft" color={product.quantity < 6 ? "danger" : "success"}>
                                {product.quantity} в наявності
                            </Chip> :
                            <Chip className="product-page__cashback" size="md" variant="soft" color="danger">
                                Немає в наявності
                            </Chip>
                        }

                        <br />
                        {product?.info?.color &&
                            <Typography className="product-page__color"><b style={{ color: "black" }}>Колір: </b>{product.info.color}</Typography>
                        }

                        {product?.info?.size && (
                            product.info.size.split(',').length > 1 ? (
                                <Select
                                    placeholder="Виберіть розмір"
                                    name="foo"
                                    required
                                    sx={{ maxWidth: 200 }}
                                    value={size}
                                    onChange={(e, newValue) => setSize(newValue)}
                                >
                                    {product.info.size.split(',').map((item, index) => (
                                        <Option key={index + 1} value={item.trim()}>
                                            {item.trim()}
                                        </Option>
                                    ))}
                                </Select>
                            ) : (
                                <Typography className="product-page__size">
                                    <b style={{ color: "black" }}>Розмір: </b>{product.info.size}
                                </Typography>
                            )
                        )}

                        {product?.info?.material &&
                            <Typography className="product-page__material">
                                <b style={{ color: "black" }}>Матеріал: </b>
                                {product.info.material}
                            </Typography>
                        }
                        <Typography variant="h5" className="product-page__description" sx={{ color: "black", fontSize: "18px" }}>{product?.info?.description}</Typography>
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
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                startDecorator={<ErrorOutlineRoundedIcon />}
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
                <Typography>
                    {snackbarMessage}
                </Typography>
            </Snackbar>
        </Container >
    );
};

export { ProductPage };