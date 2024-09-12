import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../redux';
import { ErrorPage } from '../../pages';

const PrivateRoute = () => {
    const dispatch = useDispatch();
    const { user, error } = useSelector(state => state.userReducer);
    const { userId } = useSelector(state => state.authReducer);

    useEffect(() => {
        if (userId) {
            dispatch(userActions.getUserById(userId));
        }
    }, [dispatch, userId]);


    if (error) {
        return <ErrorPage />;
    }

    if (!user || !user.isAdmin) {
        return <Navigate to="/auth?admin" />;
    }

    return <Outlet />;
};

export { PrivateRoute };
