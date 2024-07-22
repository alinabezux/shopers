import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../redux";
import ProductCard from "./ProductCard";
import { Box } from "@mui/material";

const Products = () => {
    const dispatch = useDispatch();

    const { products, error } = useSelector(state => state.productReducer);
    const { selectedCategory } = useSelector(state => state.categoryReducer);
    const { selectedType } = useSelector(state => state.typeReducer);

    useEffect(() => {
        dispatch(productActions.getAll({
            _category: selectedCategory._id,
            _type: selectedType._id,
        }))
    }, [dispatch, selectedCategory._id, selectedType._id]);

    // useEffect(() => {
    //     if (currentPageProducts > totalPagesProducts) {
    //         dispatch(productsActions.setCurrentPageProducts(1));
    //     }
    // }, [dispatch, currentPageProducts, totalPagesProducts]);


    // const handleSetCurrentPageProducts = async (pageNumber) => {
    //     dispatch(productsActions.setCurrentPageProducts(pageNumber));
    // }

    // const paginationItemsProducts = generatePagination(totalPagesProducts, currentPageProducts, handleSetCurrentPageProducts);

    return (
        <Box className="products">
            <Box className="products__container">
                {
                    products.map(product =>
                        <ProductCard key={product._id} product={product} />)
                }
            </Box>
            {error && <h1>Error:(</h1>}
            {/*<Pagination style={{display: "flex", justifyContent: "center"}}>{paginationItemsProducts}</Pagination>*/}
        </Box >
    );
};

export { Products };