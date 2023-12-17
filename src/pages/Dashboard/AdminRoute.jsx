import React from 'react';
import UseAuth from '../../Hooks/UseAuth';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import UseAdmin from '../../Hooks/UseAdmin';

const AdminRoute = ({ children }) => {
    const { user, loading } = UseAuth();
    const [isAdmin, isAdminloading] = UseAdmin()
    console.log(isAdmin)
    const location = useLocation()

    if (loading || isAdminloading) {
        return <progress className="progress w-56"></progress>
    }
    if (user && isAdmin) {
        return children
    }
    return <Navigate to={'/'} state={{ from: location }}></Navigate >

};

export default AdminRoute;