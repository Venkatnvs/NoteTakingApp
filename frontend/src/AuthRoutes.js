import React from "react";
import { Navigate, Outlet } from 'react-router-dom'

const AuthRoutes = () =>{
    const auth = localStorage.getItem('token');
    if (!auth) {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
};

export default AuthRoutes;