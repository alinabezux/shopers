import React from 'react';
import { Container, Stack, Typography, Box } from "@mui/material";
import { CategoriesMenu } from "./CategoriesMenu";
import TypesMenu from "./TypesMenu";
import {Products} from "./Product/Products";
import { BackButton } from "./BackButton";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Catalogue = ({ name }) => {
    const location = useLocation();
    const shop = location.pathname.includes('/shop');

    return (
        <Box className="catalogue">
            <Stack direction="column" spacing={3} alignItems="center">
                <Stack direction="row" spacing={2} alignItems="center">
                    <BackButton />
                    <Typography className="catalogue__title" variant="h3">{name}</Typography>
                </Stack>
                {shop ? <CategoriesMenu width={"180px"} /> : null}
                {!shop ? <TypesMenu/> : null}
                <Products />
            </Stack>
        </Box>
    );
};

export { Catalogue };