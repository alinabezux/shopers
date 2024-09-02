import React from 'react';
import { useSelector } from "react-redux";

import { Catalogue } from '../components';

const TypePage = () => {
    const { selectedCategory } = useSelector(state => state.categoryReducer);
   
    return (
        <Catalogue name={selectedCategory.name} key={selectedCategory._id} />
    );
};

export { TypePage };