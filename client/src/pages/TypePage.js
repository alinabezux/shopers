import React from 'react';
import { Catalogue } from '../components';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';


const TypePage = () => {
    const { selectedCategory } = useSelector(state => state.categoryReducer);
   
    return (
        <Catalogue name={selectedCategory.name} key={selectedCategory._id} />
    );
};

export { TypePage };