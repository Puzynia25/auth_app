import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { Context } from "../App";
import UserTable from "../pages/UserTable";

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
            <Route path="*" element={<UserTable />} />
        </Routes>
    );
};

export default AppRouter;
