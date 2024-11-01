import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { typeActions } from "../redux";
import { toUrlFriendly } from '../utils'

import { Box, Typography } from "@mui/material";

const TypesMenu = () => {
    const { selectedCategory } = useSelector(state => state.categoryReducer);
    const { typesByCategory, selectedType } = useSelector(state => state.typeReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedCategory) {
            dispatch(typeActions.getTypesByCategoryId({ categoryId: selectedCategory._id }));
        }
    }, [dispatch, selectedCategory]);

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
                            position: 'relative',
                            textTransform: 'lowercase',
                            fontWeight: 300,
                            mx: "15px",
                            color: "grey",
                            my: "5px",
                            ":after": {
                                content: '""',
                                position: 'absolute',
                                width: 0,
                                height: '1.5px',
                                bottom: '-2px',
                                left: 0,
                                backgroundColor: 'rgb(64, 64, 64)',
                                transition: 'width 0.3s ease-in-out',
                            },
                            ":hover:after": {
                                width: '100%',
                            },
                        }}>
                        <NavLink to={`/${(toUrlFriendly(selectedCategory.name))}/${(toUrlFriendly(type.name))}`} className="link typeItem">
                            {type.name}
                        </NavLink>
                    </Typography>
                )
            }
        </Box>
    );
};

export { TypesMenu };