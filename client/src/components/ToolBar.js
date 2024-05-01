import React, { useContext, useState } from "react";
import { ContextToolBar } from "../pages/UserTable";
import {
    isFindUser,
    deleteUser,
    updateUsersStatus,
    logOutBlockedUser,
    check,
} from "../http/userAPI";
import { Context } from "../App";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const ToolBar = () => {
    const { userTable, setUserTable, selectedIds, setSelectedIds, setStatusUser, setIsDelete } =
        useContext(ContextToolBar);

    const { user, setUser, setIsAuth } = useContext(Context);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const onChangeStatusUser = (status) => {
        updateUsersStatus(selectedIds, status)
            .then(() => {
                const updatedUsers = userTable.map((user) => {
                    if (selectedIds.includes(user.id)) {
                        return { ...user, status };
                    }
                    return user;
                });
                check()
                    .then((data) => {
                        setUser(user);
                        setIsAuth(true);
                    })
                    .catch((e) => {
                        catchHandler(e);
                        console.log(e.response.data.message, "message");
                    });

                setUserTable(updatedUsers);
                setStatusUser(!status);
                setSelectedIds([]);
            })
            .catch((e) => {
                catchHandler(e);
                console.error("Error updating user status:", e);
            });
    };

    const catchHandler = (e) => {
        setLoading(true);
        logOutBlockedUser(e, setUser, setIsAuth, navigate);
        setLoading(false);
    };

    if (loading) {
        return <Spinner />;
    }

    const onDeleteUser = () => {
        if (selectedIds.length > 1) {
            alert("Please, choose only 1 user");
        } else {
            setIsDelete(true);
            deleteUser(selectedIds[0])
                .then((data) => console.log(data))
                .then(() => {
                    checkDeletedUser(user.email);
                });
        }
        setSelectedIds([]);
    };

    const checkDeletedUser = (email) => {
        isFindUser(email).then((data) => {
            if (data === false) {
                localStorage.removeItem("user");
                setUser({});
                setIsAuth(false);
            }
        });
    };

    return (
        <main className="w-75 mx-auto mt-5">
            <div className="d-flex">
                <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() => onChangeStatusUser("active")}>
                    <i className="fas fa-user" />
                </button>
                <button
                    type="button"
                    className="ms-1 btn btn-outline-dark"
                    onClick={() => onChangeStatusUser("blocked")}>
                    <i className="fas fa-user-slash" />
                </button>
                <button
                    type="button"
                    className="ms-1 btn btn-outline-danger"
                    onClick={() => onDeleteUser()}>
                    <i className="fas fa-trash" />
                </button>
            </div>
        </main>
    );
};

export default ToolBar;
