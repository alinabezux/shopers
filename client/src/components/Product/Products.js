import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {productActions} from "../../redux";
import ProductCard from "./ProductCard";
import {Box, Container} from "@mui/material";

const Products = () => {
    const dispatch = useDispatch();

    const {products, error} = useSelector(state => state.productReducer);
    // const {selectedCategory} = useSelector(state => state.categoriesReducer);
    // const {selectedType} = useSelector(state => state.typesReducer);


    // useEffect(() => {
    //     if (currentPageProducts > totalPagesProducts) {
    //         dispatch(productsActions.setCurrentPageProducts(1));
    //     }
    // }, [dispatch, currentPageProducts, totalPagesProducts]);

    useEffect(() => {
        dispatch(productActions.getAll({
            // category: selectedCategory.category,
            // type: selectedType.type,
            // page: currentPageProducts,
            // isGettingAll: false
        }))
    }, [dispatch]);
    // selectedCategory.category,
    // selectedType.type,
    // currentPageProducts


    // const handleSetCurrentPageProducts = async (pageNumber) => {
    //     dispatch(productsActions.setCurrentPageProducts(pageNumber));
    // }

    // const paginationItemsProducts = generatePagination(totalPagesProducts, currentPageProducts, handleSetCurrentPageProducts);

    return (
        <Container>
            <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="center"
                gap={2}
                sx={{mt: "20px"}}
            >
                {
                    products.map(product =>
                        <ProductCard key={product._id} product={product}/>)
                }
            </Box>
            {error && <h1>Error:(</h1>}
            {/*<Pagination style={{display: "flex", justifyContent: "center"}}>{paginationItemsProducts}</Pagination>*/}
        </Container>
    );
};

export default Products;