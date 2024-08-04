import React from 'react';
import { Catalogue } from '../components';
import { useSelector } from "react-redux";

const TypePage = () => {
    const { selectedCategory } = useSelector(state => state.categoryReducer);

    return (
        <Catalogue name={selectedCategory.name} key={selectedCategory._id} />
    );
};

export { TypePage };