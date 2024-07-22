import React from 'react';
import Button2 from "@mui/material/Button";
import { Link } from 'react-router-dom';
import {
    Box,
    Typography,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';


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
const Orders = () => {
    return (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <LocalMallOutlinedIcon sx={{ fontSize: "95px", color: "rgba(0, 0, 0, 0.1)" }} />
            <Typography variant="h5" sx={{ fontSize: "28px" }}>У вас ще не було замовлень.</Typography>
            <BlackButton variant="outlined" size="large">
                <Link to="/shop"
                    style={{
                        color: "inherit",
                        textDecoration: "none"
                    }}>КАТАЛОГ</Link>
            </BlackButton>
        </Box>
    );
};

export { Orders };