import React from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const ProductPage = () => {
    const { selectedProduct } = useSelector(state => state.productReducer);

    console.log(selectedProduct);
    return (
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
        >
            <Link style={{
                color: "inherit",
                undeline: "none"
            }} to="/">
                Головна
            </Link>
            <Link style={{
                color: "inherit",
                undeline: "none"
            }} to="/">
                <Typography>
                    {selectedProduct._category}
                </Typography>
            </Link>
            {/*<Link underline="hover" color="inherit" to="/">*/}
            {/*    {selectedProduct._type}*/}
            {/*</Link>*/}
        </Breadcrumbs>
    );
};

export { ProductPage };