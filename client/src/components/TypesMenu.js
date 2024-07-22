import React, { useEffect, useCallback } from 'react';
import { Box, Stack, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { typeActions } from "../redux";
import { NavLink } from "react-router-dom";
import { toUrlFriendly } from '../utils'

const TypesMenu = () => {
    const { selectedCategory } = useSelector(state => state.categoryReducer);
    const { typesByCategory } = useSelector(state => state.typeReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(typeActions.getTypesByCategoryId({ categoryId: selectedCategory._id }));
    }, [dispatch, selectedCategory._id]);

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
                        <NavLink to={`/${(toUrlFriendly(selectedCategory.name))}/${(toUrlFriendly(type.name))}`} className={({ isActive }) => isActive ? "link active" : "link"}>
                            {type.name}
                        </NavLink>
                    </Typography>
                )
            }
        </Box>
    );
};

export default TypesMenu;