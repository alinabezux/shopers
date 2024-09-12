import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PrivateRoute = () => {
    const { user, loading } = useSelector(state => state.userReducer);
    const { userId } = useSelector(state => state.authReducer);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userId || !user.isAdmin) {
        return <Navigate to="/auth?admin" />;
    }
    return <Outlet />
};

export { PrivateRoute };
