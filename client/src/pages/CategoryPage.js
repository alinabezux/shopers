import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from 'react-router-dom';
import { Catalogue } from '../components';

import { toUrlFriendly } from '../utils';
import { categoryActions, typeActions } from '../redux';

const CategoryPage = () => {
    const dispatch = useDispatch();
    const { categoryName, typeName } = useParams();
    const location = useLocation();

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

    }, [categoryName, categories, dispatch, typeName, types]);


    return (
        <Catalogue name={selectedCategory.name} key={selectedCategory._id} />
    );
};

export { CategoryPage };