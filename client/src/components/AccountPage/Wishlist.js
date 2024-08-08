import React, { useEffect, useState } from 'react';
import Button2 from "@mui/material/Button";
import { Link } from 'react-router-dom';
import {
    Box,
    Typography,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from "react-redux";
import { favoriteActions } from '../../redux';
import { ProductInFavorite } from '../ProductInFavorite';


const BlackButton = styled(Button2)(() => ({
    color: 'black',
    backgroundColor: "transparent",
    '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: "white",
        border: "1px solid white"
    },
    margin: '15px',
    fontFamily: 'Geologica, sans-serif',
    fontWeight: '800',
    fontSize: '20px',
    border: "1px solid black",

}));

const Wishlist = () => {
    const dispatch = useDispatch();
    const { favorite, loading, error } = useSelector(state => state.favoriteReducer);
    const { userId } = useSelector(state => state.authReducer);

    useEffect(() => {
        if (userId) {
            dispatch(favoriteActions.getFavorite(userId))
        }
    }, [dispatch, userId])

    return (
        <Box className='accountpage__wishlist' >
            {favorite.length ?
                <Box className="accountpage__wishlist-container">
                    {favorite.map(product => (<ProductInFavorite key={product._id} product={product} />))}
                </Box>
                :
                <>
                    <FavoriteBorderIcon sx={{ fontSize: "95px", color: "rgba(0, 0, 0, 0.1)" }} />
                    <Typography variant="h5" sx={{ fontSize: "28px" }}>Цей список бажань порожній.</Typography>
                    <BlackButton variant="outlined" size="large">
                        <Link to="/shop"
                            style={{
                                color: "inherit",
                                textDecoration: "none"
                            }}>КАТАЛОГ</Link>
                    </BlackButton>
                </>
            }

        </Box >
    );
};

export { Wishlist };