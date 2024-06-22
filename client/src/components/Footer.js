import React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Container,
    Divider,
    Link,
    Stack,
    Typography, useMediaQuery, useTheme
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import instlogo from "../assets/inst logo.png";
import inst from "../assets/inst.png";
import {AccordionGroup} from "@mui/joy";

const Footer = () => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Box sx={{backgroundColor: "black", width: "100vw", boxSizing: "border-box", marginTop: "50px"}}>
            <Container sx={{display: "flex", flexDirection: {xs: 'column', md: 'row'}}}>
                <Accordion key={"1"} id={"1"} sx={{
                    boxShadow: 'none',
                    '&:before': {
                        display: 'none',
                    },
                    backgroundColor: "transparent",
                    width: "100%",
                    '&.Mui-expanded': {
                        margin: 0,
                    }
                }}>

                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "#9e9e9e"}}/>}>
                        <Typography sx={{fontFamily: "Geologica, sans-serif", color: "grey", fontSize: '20px'}}>
                            КЛІЄНТАМ
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails sx={{color: "grey",}}>
                        <Stack direction="column" spacing={2}>
                            <Link href="/oplata-ta-dostavka" underline="none" sx={{
                                color: "#9e9e9e",
                                fontWeight: '400',
                                fontSize: '15px',
                                '&:hover': {
                                    color: "white",
                                },

                            }}>
                                ОПЛАТА ТА ДОСТАВКА
                            </Link>
                            <Link href="/obmin-ta-povernennya" underline="none" sx={{
                                color: "#9e9e9e",
                                fontWeight: '400',
                                fontSize: '15px',
                                '&:hover': {
                                    color: "white",
                                },

                            }}>
                                ОБМІН ТА ПОВЕРНЕННЯ
                            </Link>
                            <Link href="/dogovir-oferty" underline="none" sx={{
                                color: "#9e9e9e",
                                fontWeight: '400',
                                fontSize: '15px',
                                '&:hover': {
                                    color: "white",
                                },

                            }}>
                                ДОГОВІР ОФЕРТИ
                            </Link>
                        </Stack>
                    </AccordionDetails>
                </Accordion>


                <Accordion key={"2"} id={"2"} sx={{
                    boxShadow: 'none',
                    '&:before': {
                        display: 'none',
                    },
                    backgroundColor: "transparent",
                    width: "100%",
                    '&.Mui-expanded': {
                        margin: 0,
                    },
                }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "#9e9e9e"}}/>}>
                        <Typography sx={{fontFamily: "Geologica, sans-serif", color: "grey", fontSize: '20px'}}>
                            КОНТАКТИ
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails sx={{color: "grey",}}>
                        <Stack direction="column" spacing={1}>
                            <Typography
                                sx={{fontFamily: "Geologica, sans-serif", color: "grey",}}>
                                Зв'язатися з нами в Instagram:
                            </Typography>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <img src={instlogo} alt="inst logo" height={20}/>
                                    <Link href="https://www.instagram.com/shopers_vi/" underline="none" sx={{
                                        color: "#9e9e9e",
                                        fontWeight: '400',
                                        fontSize: '18px',
                                        '&:hover': {
                                            color: "white",
                                        },
                                    }}>
                                        @shopers_vi
                                    </Link>
                                </Stack>
                                <img src={inst} alt="inst image" height={40}/>
                            </Stack>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            </Container>
            <hr style={{width: "80vw"}}/>
            <Stack direction="column" spacing={1} alignItems="center" sx={{padding: "20px"}}>
                <Link href="/politika-konfidencijnosti" underline="none" sx={{
                    color: "#9e9e9e",
                    fontWeight: '300', fontSize: '14px',
                    '&:hover': {
                        color: "white",
                    },

                }}>
                    Політика конфіденційності
                </Link>
                <span
                    style={{
                        fontFamily: "Geologica, sans-serif",
                        fontWeight: '300',
                        fontSize: '14px',
                        color: "#9e9e9e"
                    }}>
                        @ 2024 - SHOPERS_VI. Всі права захищені.
                    </span>
            </Stack>
        </Box>
    );
};

export {Footer};