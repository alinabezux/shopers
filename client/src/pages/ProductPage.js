import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { toUrlFriendly } from '../utils'

import { Typography, Box, Stack } from '@mui/material';
import { Button, Chip, ButtonGroup } from "@mui/joy";
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
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

const ProductPage = () => {
    const { selectedProduct } = useSelector(state => state.productReducer);
    const { categories } = useSelector(state => state.categoryReducer);
    const { types } = useSelector(state => state.typeReducer);


    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const category = categories.find(category => category._id === selectedProduct._category);
    const type = types.find(type => type._id === selectedProduct._type);

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
                                <img
                                    src={image}
                                    alt={`Slide ${index}`}
                                // style={{ width: "100%", height: "100%", objectFit: 'cover' }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
                <Box>
                    <Stack direction="column" spacing={1} className="product-page__info">
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h4" className="product-page__name">{selectedProduct.name}</Typography>
                            <FavoriteBorderRoundedIcon sx={{ fontSize: "35px" }} className="product-page__heart-icon" />
                            {/*<FavoriteBorderRoundedIcon sx={{fontSize: 35, color: "#730000"}}/>*/}

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
                            <Button variant="solid" color="neutral" className="product-page__button" endDecorator={<LocalMallOutlinedIcon />}>ДОДАТИ В КОШИК</Button>
                        </Stack>
                        <Chip className="product-page__cashback" size="md" variant="soft" color="danger">
                            {selectedProduct.quantity} в наявності
                        </Chip>
                        <br />
                        {/* <br /> */}
                        <Typography className="product-page__color"><b style={{ color: "black" }}>Колір: </b>{selectedProduct.info.color}</Typography>
                        <Typography className="product-page__size"><b style={{ color: "black" }}>Розмір: </b>{selectedProduct.info.size}</Typography>
                        <Typography className="product-page__material"><b style={{ color: "black" }}>Матеріал: </b>{selectedProduct.info.material}</Typography>
                        <Typography variant="h5" className="product-page__description" sx={{ color: "black", fontSize: "18px" }}>{selectedProduct.info.description}</Typography>
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
};

export { ProductPage };