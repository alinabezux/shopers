import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {Box, Typography} from "@mui/material";
import {CardContent, CardCover} from "@mui/joy";
import Card from "@mui/joy/Card";

const CategoriesMenu = () => {

    const {categories} = useSelector(state => state.categoryReducer);

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
        }}>
            {categories.map((category) => (
                <Card sx={{
                    width: {xs: "150px", md: "250px"},
                    height: {xs: "150px", md: "250px"},
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
                        <Typography
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

            ))
            }
        </Box>
    );
};

export {
    CategoriesMenu
};