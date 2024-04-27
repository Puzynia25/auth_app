import React, { useContext, useEffect, useState } from "react";
import { ContextToolBar } from "../pages/UserTable";

const ToolBar = () => {
    const { userTable, selectedItems, setSelectedItems, statusUser, setStatusUser } =
        useContext(ContextToolBar);

    const changeStatusUser = (status) => {
        userTable.forEach((user) => {
            if (selectedItems.includes(user.id)) {
                user.status = status;
            }
        });
        setStatusUser(!status);
        setSelectedItems([]);
    };

    return (
        <main className="w-75 mx-auto mt-5">
            <div className="flex ">
                <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() => changeStatusUser("active")}>
                    <i className="fas fa-user" />
                </button>
                <button
                    type="button"
                    className="ms-1 btn btn-outline-dark"
                    onClick={() => changeStatusUser("blocked")}>
                    <i className="fas fa-user-slash" />
                </button>
                <button type="button" className="ms-1 btn btn-outline-danger">
                    <i className="fas fa-trash" />
                </button>
            </div>
        </main>
    );
};

export default ToolBar;
