import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import { CardContent, CardCover } from "@mui/joy";
import Card from "@mui/joy/Card";
import transliterate from "transliterate";
import { categoryActions } from "../redux";
import { Link } from "react-router-dom";

const CategoriesMenu = ({ width }) => {
    const { categories } = useSelector(state => state.categoryReducer);

    const dispatch = useDispatch();

    const handleCategoryClick = useCallback((category) => {
        dispatch(categoryActions.setSelectedCategory(category));
    }, [dispatch]);

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
        }}>
            {categories.map((category) => (
                <Link key={category._id} to={`/${(transliterate(category.name).toLowerCase())}`}
                    style={{
                        color: "inherit",
                        textDecoration: "none"
                    }}
                >
                    <Card sx={{
                        width: { xs: "150px", md: width },
                        height: { xs: "150px", md: width },
                        m: "10px",
                        p: "0",
                        boxSizing: "border-box",
                        borderRadius: "5px"
                    }}>
                        <CardCover>
                            <img
                                src={category.image}
                                alt={category.name}
                            />
                        </CardCover>
                        <CardContent>
                            <Typography onClick={() => handleCategoryClick(category)}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "5px",
                                    backgroundColor: 'rgba(112,0,0,0.07)',
                                    fontFamily: 'Geologica, sans-serif',
                                    fontSize: '20px',
                                    textTransform: 'uppercase',
                                    fontWeight: 700,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    margin: "0",

                                    backdropFilter: 'blur(2px)',
                                    transition: 'backdrop-filter 0.3s ease',
                                    '&:hover': {
                                        backdropFilter: 'none',
                                    },

                                }}
                            >
                                {category.name}
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>
            ))
            }
        </Box>
    );
};

export {
    CategoriesMenu
};