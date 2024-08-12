import React, { useEffect, useState } from 'react';
import { Catalogue } from '../components';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from 'react-router-dom';
import { toUrlFriendly } from '../utils';
import { categoryActions, typeActions } from '../redux';
import { ShopPage } from './ShopPage';

const CategoryPage = () => {
    const dispatch = useDispatch();
    const { categoryName, typeName } = useParams();
    const location = useLocation();
    const isShop = location.pathname.includes('/shop');

    const { categories, selectedCategory } = useSelector(state => state.categoryReducer);
    const { types } = useSelector(state => state.typeReducer);


    useEffect(() => {
        const selectedCat = categories.find(cat => toUrlFriendly(cat.name) === categoryName);
        if (selectedCat) {
            dispatch(categoryActions.setSelectedCategory(selectedCat));
        } else dispatch(categoryActions.clearSelectedCategory())

        const selectedTyp = types.find(typ => toUrlFriendly(typ.name) === typeName);
        if (selectedTyp) {
            dispatch(typeActions.setSelectedType(selectedTyp));
        } else dispatch(typeActions.clearSelectedType())

        // if (isShop) {
        //     dispatch(categoryActions.clearSelectedCategory());
        //     dispatch(typeActions.clearSelectedType());
        // }

    }, [categoryName, categories, dispatch, typeName, types]);


    return (
        // <>
        //     {isShop ?
        //         <ShopPage /> :
                <Catalogue name={selectedCategory.name} key={selectedCategory._id} />
        //     }
        // </>
    );
};

export { CategoryPage };