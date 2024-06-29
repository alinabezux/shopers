import React from 'react';
import { Catalogue } from '../components';
import { useSelector } from "react-redux";
import { Outlet } from 'react-router-dom';

const CategoryPage = () => {
    const { selectedCategory } = useSelector(state => state.categoryReducer);
    const { selectedType } = useSelector(state => state.typeReducer);

    return (
        <>
            <Catalogue name={selectedCategory.name} key={selectedCategory._id} />
            {/* <Outlet /> */}
        </>
    );
};

export { CategoryPage };