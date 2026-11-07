import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { CategoriesMenu } from '../components';
import { bannerActions } from '../redux';
import fon_pc from '../assets/SHOPERS_VI2.jpg'
import fon2 from '../assets/fon2.jpg'

import { Box, Container, Typography, Button } from "@mui/material";

const HomePage = () => {
    const dispatch = useDispatch();
    const { desktopUrl, mobileUrl } = useSelector(state => state.bannerReducer);

    useEffect(() => {
        dispatch(bannerActions.getBanner());
    }, [dispatch]);

    const desktopSrc = desktopUrl || fon_pc;
    const mobileSrc  = mobileUrl  || fon2;

    return (
        <Box className="homepage">
            <Box className="homepage__section1">
                <picture style={{ display: 'contents' }}>
                    {/* Mobile source (≤ 1024 px) */}
                    <source media="(max-width: 1024px)" srcSet={mobileSrc} />
                    {/* Desktop source (> 1024 px) — default img src */}
                    <img
                        src={desktopSrc}
                        alt="Головний банер"
                        className="homepage__image homepage__image--adaptive"
                    />
                </picture>
                <Box className="homepage__dark-box">
                    <Typography className="homepage__quote">
                        Твій світ краси і естетичних товарів
                    </Typography>
                    <Button variant="outlined" size="large" className="white-button">
                        <Link to="/shop" className='link'>КАТАЛОГ</Link>
                    </Button>
                </Box>
                <Box className="homepage__gradient-white" />
            </Box>
            <Container className="homepage__section2">
                <Typography className="homepage__category-title">Категорії</Typography>
                <CategoriesMenu width={"250px"} />
            </Container>

        </Box>
    );

};

export { HomePage };