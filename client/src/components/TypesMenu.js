import React, { useEffect, useCallback } from 'react';
import { Box, Stack, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { typeActions } from "../redux";
import { Link } from "react-router-dom";
import transliterate from "transliterate";


const TypesMenu = () => {
    const { selectedCategory } = useSelector(state => state.categoryReducer);
    const { typesByCategory } = useSelector(state => state.typeReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(typeActions.getTypesByCategoryId({ categoryId: selectedCategory._id }));
    }, [dispatch]);

    const handleTypeClick = useCallback((type) => {
        dispatch(typeActions.setSelectedType(type));
    }, [dispatch]);

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
        }}>
            {
                typesByCategory.map(type =>
                    <Typography variant="h5" key={type._id}
                        onClick={() => handleTypeClick(type)}
                        sx={{
                            fontFamily: 'Geologica, sans-serif',
                            fontSize: '28px',   
                            textTransform: 'lowercase',
                            fontWeight: 300,
                            mx: "7px",
                            transition: 'color 0.3s ease',
                            '&:hover': {
                                color: "#9E2922"
                            }

                        }}>
                        <Link to={`/${(transliterate(selectedCategory.name).toLowerCase())}/${(transliterate(type.name).toLowerCase())}`}
                            style={{ textDecoration: "none", color: "inherit" }}>
                            {type.name}
                        </Link>
                    </Typography>
                )
            }
        </Box>
    );
};

export default TypesMenu;