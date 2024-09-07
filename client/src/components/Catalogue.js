import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from "react-router-dom";

import { CategoriesMenu } from "./CategoriesMenu";
import { Products } from "./Product/Products";
import { BackButton } from "./BackButton";
import { TypesMenu } from './TypesMenu';

import { Stack, Typography, Box, Fab } from "@mui/material";
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';

const Catalogue = ({ name }) => {
    const location = useLocation();
    const shop = location.pathname.includes('/shop');
    const categoriesMenuRef = useRef(null);
    const [showButton, setShowButton] = useState(false);

    const scrollToCategoriesMenu = () => {
        if (categoriesMenuRef.current) {
            const offsetTop = categoriesMenuRef.current.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setShowButton(scrollTop > 700);
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Box className="catalogue" ref={categoriesMenuRef}>
            <Stack direction="column" spacing={3} alignItems="center">
                <Stack direction="row" spacing={2} alignItems="center">
                    <BackButton />
                    <Typography className="catalogue__title" variant="h3">{name}</Typography>
                </Stack>
                {shop ? <CategoriesMenu width={"180px"} /> : null}
                {!shop ? <TypesMenu /> : null}
                <Products />
            </Stack>
            {showButton && (
                <Fab onClick={scrollToCategoriesMenu} color="neutral" aria-label="up"
                    style={{
                        position: 'fixed',
                        bottom: 16,
                        right: 16,
                    }}>
                    <ArrowUpwardRoundedIcon />
                </Fab>
            )}
        </Box>
    );
};

export { Catalogue };
