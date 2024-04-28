import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { Context } from "../App";
import Auth from "../pages/Auth";
import { LOGIN_ROUTE } from "../utils/consts";

const AppRouter = () => {
    const { isAuth } = useContext(Context);

    return (
        <Routes>
            {isAuth &&
                authRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={Component} />
                ))}
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={Component} />
            ))}
            <Route path="/" element={<Navigate to={LOGIN_ROUTE} />} />
            <Route path="*" element={<Auth />} />
        </Routes>
    );
};

export default AppRouter;
