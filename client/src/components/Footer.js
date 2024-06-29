import React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Container,
    Divider,
    Stack,
    Typography, useMediaQuery, useTheme
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import instlogo from "../assets/inst logo.png";
import inst from "../assets/inst.png";
import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <Box className="footer" >
            <Container className="footer__main">
                <Accordion className='footer__accordion' key={"1"} id={"1"} >

                    <AccordionSummary className="footer__accordion-summary" expandIcon={<ExpandMoreIcon sx={{ color: "#9e9e9e" }} />}>
                        <Typography className='footer__accordion-title'>КЛІЄНТАМ</Typography>
                    </AccordionSummary>

                    <AccordionDetails className="footer__accordion-details">
                        <Stack direction="column" spacing={2}>
                            <Link className="link" to="/oplata-ta-dostavka" >
                                <Typography className="footer__link">ОПЛАТА ТА ДОСТАВКА</Typography>
                            </Link>
                            <Link className="link" to="/obmin-ta-povernennya" >
                                <Typography className="footer__link">ОБМІН ТА ПОВЕРНЕННЯ</Typography>
                            </Link>
                            <Link className="link" to="/dogovir-oferty" >
                                <Typography className="footer__link">ДОГОВІР ОФЕРТИ</Typography>
                            </Link>
                        </Stack>
                    </AccordionDetails>
                </Accordion>


                <Accordion className="footer__accordion" key={"2"} id={"2"}>
                    <AccordionSummary className="footer__accordion-summary" expandIcon={<ExpandMoreIcon sx={{ color: "#9e9e9e" }} />}>
                        <Typography className='footer__accordion-title'>КОНТАКТИ</Typography>
                    </AccordionSummary>

                    <AccordionDetails className="footer__accordion-details">
                        <Stack direction="column" spacing={1}>
                            <Typography className='footer__accordion-text'>
                                Зв'язатися з нами в Instagram:
                            </Typography>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <img src={instlogo} alt="inst logo" height={20} />
                                    <Link className="link" to="https://www.instagram.com/shopers_vi/">
                                        <Typography className='footer__link inst'>
                                            @shopers_vi
                                        </Typography>
                                    </Link>
                                </Stack>
                                <img src={inst} alt="inst image" height={40} />
                            </Stack>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            </Container>
            <hr style={{ width: "80vw" }} />
            <Stack direction="column" spacing={1} alignItems="center" sx={{ padding: "20px" }}>
                <Link className="link" to="/politika-konfidencijnosti" >
                    <Typography className='footer__link pol'>
                        Політика конфіденційності
                    </Typography>
                </Link>
                <span className='footer__link'>
                    @ 2024 - SHOPERS_VI. Всі права захищені.
                </span>
            </Stack>
        </Box >
    );
};

export { Footer };