import React from 'react';
import { Outlet } from 'react-router-dom';

import { Catalogue } from '../components';

const ShopPage = () => {
    return (
        <>
            <Catalogue name="Каталог" />
            <Outlet />
        </>
    );
};

export { ShopPage };