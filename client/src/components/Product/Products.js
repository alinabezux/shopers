import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../redux";
import ProductCard from "./ProductCard";
import { Box, Pagination } from "@mui/material";

const Products = () => {
    const dispatch = useDispatch();

    const { products, error, currentPageProducts, totalPagesProducts } = useSelector(state => state.productReducer);
    const { selectedCategory } = useSelector(state => state.categoryReducer);
    const { selectedType } = useSelector(state => state.typeReducer);

    useEffect(() => {
        dispatch(productActions.getAll({
            _category: selectedCategory._id,
            _type: selectedType._id,
            page: currentPageProducts,
            isGettingAll: false
        }))
    }, [dispatch, selectedCategory._id, selectedType._id, currentPageProducts]);

    const handleSetCurrentPageProducts = async (event, value) => {
        dispatch(productActions.setCurrentPageProducts(value));
    }

    return (
        <Box className="products">
            <Box className="products__container">
                {
                    products.map(product =>
                        <ProductCard key={product._id} product={product} />)
                }
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 3
            }}>
                <Pagination count={totalPagesProducts} onChange={handleSetCurrentPageProducts} />
            </Box>
            {error && <h1>Error:(</h1>}
        </Box >
    );
};

export { Products };