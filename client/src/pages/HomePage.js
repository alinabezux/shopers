import React from 'react';
import {Box, Container, Typography, Button, Link} from "@mui/material";
import Products from "../components/Product/Products";
import fon from '../assets/fon.jpeg'
import fon2 from '../assets/fon 2.jpg'
import img from "../assets/test imge.png";
import {styled} from '@mui/material/styles';
import {CategoriesMenu} from "../components/CategoriesMenu";

const WhiteButton = styled(Button)(({theme}) => ({
    color: "white",
    backgroundColor: "transparent",
    '&:hover': {
        backgroundColor: 'rgba(255,255,255,0.7)',
        color: "black",
        border: "2px solid white"
    },
    margin: '30px',
    fontFamily: 'Geologica, sans-serif',
    fontWeight: '800',
    fontSize: '20px',
    border: "2px solid white"
}));
const RedButton = styled(Button)(({theme}) => ({
    color: "#9E2922",
    backgroundColor: "transparent",
    '&:hover': {
        backgroundColor: '#9E2922',
        color: "white",
        border: "2px solid #9E2922"
    },
    margin: '30px',
    fontFamily: 'Geologica, sans-serif',
    fontWeight: '800',
    fontSize: '20px',
    border: "2px solid #9E2922"
}));

const HomePage = () => {
    return (
        <Box>
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100vw',
                    height: "80vh",
                    overflow: "hidden",

                }}
            >
                {/*<img*/}
                {/*    src={fon2}*/}
                {/*    alt="fon"*/}
                {/*    style={{*/}
                {/*        height: "100%",*/}
                {/*        opacity: 0.8,*/}
                {/*        display: {md: "none"}*/}
                {/*    }}*/}

                {/*/>*/}

                <img
                    src={fon2}
                    alt="fon"
                    style={{
                        width: "50%",
                        opacity: 0.8,
                        display: {xs: "none", md: "flex"},

                        // marginTop: "-40%"
                    }}

                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Чорний напівпрозорий фон
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white', // Білий текст поверх темного фону
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: 'Bad Script, sans-serif',
                            fontSize: '25px',
                        }}
                    >
                        Твій світ краси і естетичних товарів
                    </Typography>
                    <WhiteButton
                        variant="outlined"
                        size="large"
                    >
                        <Link href="/shop" underline="none" color={'inherit'}>
                            КАТАЛОГ
                        </Link>
                    </WhiteButton>
                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '20vh',
                        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #F6F6F6 100%)',
                    }}
                />
                <Typography
                    sx={{
                        fontFamily: 'Geologica, sans-serif',
                        fontSize: '30px',
                        fontWeight: 600,
                        textAlign: "center",
                        marginTop: "-50px",
                        zIndex: 999,
                    }}
                >
                    Категорії
                </Typography>
            </Box>
            <Container>
                <CategoriesMenu width={"250px"}/>
            </Container>
        </Box>
    );
};

export {HomePage};