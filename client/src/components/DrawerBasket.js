import React from 'react';
import {
    Box,
    IconButton, Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import Card from '@mui/joy/Card';


const DrawerBasket = ({ open, onClose }) => {
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
            <Box className='basket' >
                <Box className='basket__header' >
                    <Typography className='basket__title' variant="h3" >КОШИК</Typography>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="close drawer"
                        onClick={onClose}
                        sx={{ px: "0" }}
                    >
                        <CloseIcon fontSize="large" />
                    </IconButton>
                </Box>
            </Box>
        </Drawer>
    );
};

export { DrawerBasket };