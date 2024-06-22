import React from 'react';
import {
    Box,
    IconButton, Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import Card from '@mui/joy/Card';


const DrawerBasket = ({open, onClose}) => {
    // const product = {
    //     photo,
    //     nme,
    //     ntity,
    //     price
    //     color,
    //     sie,
    //     cshbck
    //
    // }

    return (
        <Drawer open={open} anchor="right">
            <Box sx={{width: {xs: '80vw', md: "25vw"}}}>
                <Box
                    sx={{backgroundColor: "black", color: "white"}}>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{mr: 2}}
                        onClick={onClose}
                    ><CloseIcon fontSize="large"/>
                    </IconButton>
                </Box>
                <Typography variant="h3" sx={{
                    fontFamily: "Geologica, sans-serif",
                    fontSize: "30px",
                    fontWeight: 500,
                }}>КОШИК</Typography>
            </Box>
        </Drawer>
    );
};

export {DrawerBasket};