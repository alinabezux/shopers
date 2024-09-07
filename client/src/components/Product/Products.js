import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';

import { productActions } from "../../redux";
import ProductCard from "./ProductCard";

import { Box, CircularProgress, Pagination } from "@mui/material";
import { ErrorPage } from '../../pages';

const Products = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const isShop = useMemo(() => location.pathname.includes('/shop'), [location]);

    const { products, currentPageProducts, totalPagesProducts, loading, error } = useSelector(state => state.productReducer);
    const { selectedCategory } = useSelector(state => state.categoryReducer);
    const { selectedType } = useSelector(state => state.typeReducer);

    const categoryId = useMemo(() => (isShop ? undefined : selectedCategory?._id), [isShop, selectedCategory]);
    const typeId = useMemo(() => (isShop ? undefined : selectedType?._id), [isShop, selectedType]);

    useEffect(() => {
        dispatch(productActions.getAll({
            _category: categoryId,
            _type: typeId,
            page: currentPageProducts,
            isGettingAll: false
        }))
    }, [dispatch, selectedCategory, selectedType, currentPageProducts, categoryId, typeId]);

    const handleSetCurrentPageProducts = async (event, value) => {
        dispatch(productActions.setCurrentPageProducts(value));
    }

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress color="inherit" />
            </Box>
        );
    }

    if (error) {
        return <ErrorPage message={error.message || 'Щось пішло не так...'} />;
    }

    return (
        <Box className="products">
            {products.length ?
                (
                    <>
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
                            <Pagination count={totalPagesProducts || 0} onChange={handleSetCurrentPageProducts} />
                        </Box>
                    </>
                ) : (
                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                        <h2>Товарів не знайдено.</h2>
                    </Box>
                )}
        </Box >
    );
};

export { Products };