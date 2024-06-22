import React from 'react';
import {Container, Stack, Typography} from "@mui/material";
import {CategoriesMenu} from "./CategoriesMenu";
import Types from "./Types";
import Products from "./Product/Products";
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import {BackButton} from "./BackButton";
import {useSelector} from "react-redux";

const Catalogue = ({name}) => {
    const {selectedCategory} = useSelector(state => state.categoryReducer);

    return (
        <Container sx={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px"}}>
            <Stack direction="column" spacing={3} alignItems="center">
                <Stack direction="row" spacing={2} alignItems="center">
                    <BackButton/>
                    <Typography variant="h3"
                                sx={{
                                    fontFamily: 'Geologica, sans-serif',
                                    textTransform: 'uppercase',
                                    fontWeight: 500,
                                }}>{name}</Typography>
                </Stack>
                <CategoriesMenu width={"180px"}/>
                <Types/>
                <Products/>
            </Stack>
        </Container>
    );
};

export {Catalogue};