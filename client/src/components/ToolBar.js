import React, { useContext } from "react";
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

const ToolBar = () => {
    const {
        userTable,
        setUserTable,
        selectedIds,
        setSelectedIds,
        setStatusUser,
        isDelete,
        setIsDelete,
    } = useContext(ContextToolBar);

    const { user, setUser, setIsAuth } = useContext(Context);

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
                        logOutBlockedUser(e, setUser, setIsAuth, navigate);
                        console.log(e.response.data.message, "message");
                    });

                setUserTable(updatedUsers);
                setStatusUser(!status);
                setSelectedIds([]);
            })
            .catch((e) => {
                logOutBlockedUser(e, setUser, setIsAuth, navigate);
                console.error("Error updating user status:", e);
            });
    };

    const onDeleteUser = () => {
        if (selectedIds.length > 1) {
            alert("Please, choose only 1 user");
        } else {
            deleteUser(selectedIds[0])
                .then((data) => console.log(data))
                .then(() => {
                    checkDeletedUser(user.email);
                })
                .finally(() => setIsDelete(!isDelete));
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
