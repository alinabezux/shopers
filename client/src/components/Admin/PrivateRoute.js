import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../redux';

const PrivateRoute = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.userReducer);
    const { userId } = useSelector(state => state.authReducer);

    useEffect(() => {
        if (userId !== null) {
            dispatch(userActions.getUserById(userId));
        }
    }, [dispatch, userId])

    if (!userId && !user.isAdmin) {
        return <Navigate to="/auth?admin" />;
    }
    return <Outlet />
};

export { PrivateRoute };
