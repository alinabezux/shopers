import React from 'react';
import { Catalogue } from '../components';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/joy';

const ShopPage = () => {
    return (
        <>
            <Catalogue name="Каталог" />
            <Outlet />
        </>
    );
};

export { ShopPage };