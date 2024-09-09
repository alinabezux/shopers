import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { favoriteActions } from '../../redux';
import { ProductInFavorite } from '../ProductInFavorite';

import {
    Box,
    Button,
    Typography,
} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const Wishlist = () => {
    const dispatch = useDispatch();
    const { favorite } = useSelector(state => state.favoriteReducer);
    const { userId } = useSelector(state => state.authReducer);


    useEffect(() => {
        if (userId) {
            dispatch(favoriteActions.getFavorite(userId))
        }
        console.log('favorite')
        console.log(favorite)
    }, [dispatch, userId, favorite])

    return (
        <Box className='accountpage__wishlist' >
            {favorite.length ?
                <Box className="accountpage__wishlist-container">
                    {favorite.map(product => (<ProductInFavorite key={product._id} product={product} />))}
                </Box>
                :
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <FavoriteBorderIcon sx={{ fontSize: "95px", color: "rgba(0, 0, 0, 0.1)" }} />
                    <Typography variant="h5" sx={{ fontSize: "28px", textAlign: "center" }}>Цей список бажань порожній.</Typography>
                    <Button variant="outlined" size="large" className="white-button">
                        <Link to="/shop"
                            style={{
                                color: "inherit",
                                textDecoration: "none"
                            }}>КАТАЛОГ</Link>
                    </Button>
                </Box>
            }

        </Box >
    );
};

export { Wishlist };