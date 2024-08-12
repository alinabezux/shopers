import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../redux";
import ProductCard from "./ProductCard";
import { Box, Pagination } from "@mui/material";
import { useLocation } from 'react-router-dom';

const Products = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const isShop = location.pathname.includes('/shop');

    const { products, error, currentPageProducts, totalPagesProducts, loading } = useSelector(state => state.productReducer);
    const { selectedCategory } = useSelector(state => state.categoryReducer);
    const { selectedType } = useSelector(state => state.typeReducer);

    useEffect(() => {
        dispatch(productActions.getAll({
            _category: isShop ? {} : selectedCategory._id,
            _type: isShop ? {} : selectedType._id,
            page: currentPageProducts,
            isGettingAll: false
        }))
    }, [dispatch, selectedCategory, selectedType, currentPageProducts]);

    const handleSetCurrentPageProducts = async (event, value) => {
        dispatch(productActions.setCurrentPageProducts(value));
    }

    return (
        <Box className="products">
            <Box className="products__container">
                {
                    products.map(product =>
                        <ProductCard key={product._id} product={product} loading={loading} />)
                }
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 3
            }}>
                <Pagination count={totalPagesProducts || 0} onChange={handleSetCurrentPageProducts} />
            </Box>
            {error && <h1>Error:(</h1>}
        </Box >
    );
};

export { Products };