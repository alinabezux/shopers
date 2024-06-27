import React from 'react';
import { Box, Container, Typography, Button, Link } from "@mui/material";
import Products from "../components/Product/Products";
import fon from '../assets/fon.jpeg'
import fon2 from '../assets/fon 2.jpg'
import fon_pc from '../assets/SHOPERS_VI.jpg'

import img from "../assets/test imge.png";
import { styled } from '@mui/material/styles';
import { CategoriesMenu } from "../components/CategoriesMenu";

const WhiteButton = styled(Button)(({ theme }) => ({
    color: 'black',
    backgroundColor: "transparent",
    '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: "white",
        border: "1px solid white"
    },
    margin: '15px',
    fontFamily: 'Geologica, sans-serif',
    fontWeight: '800',
    fontSize: '20px',
    border: "1px solid black",
    [theme.breakpoints.down('md')]: {
        color: 'white',
        border: "2px solid white",
        margin: '30px',
        '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.7)',
            color: "black",
            border: "2px solid white"
        },
    }
}));

const HomePage = () => {
    return (
        <Box className="homepage">
            <Box className="homepage__section1">
                <img
                    src={fon2}
                    alt="fon"
                    className="homepage__image homepage__image--mb"
                />
                <img
                    src={fon_pc}
                    alt="fon"
                    className="homepage__image homepage__image--pc"
                />
                <Box className="homepage__dark-box">
                    <Typography className="homepage__quote">
                        Твій світ краси і естетичних товарів
                    </Typography>
                    <WhiteButton variant="outlined" size="large">
                        <Link href="/shop" underline="none" color={'inherit'}>КАТАЛОГ</Link>
                    </WhiteButton>
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