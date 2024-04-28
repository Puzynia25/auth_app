import React, { useContext } from "react";
import { ContextToolBar } from "../pages/UserTable";
import { check, deleteUser } from "../http/userAPI";
import { Context } from "../App";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";

const ToolBar = () => {
    const {
        userTable,
        selectedIds,
        setSelectedIds,
        statusUser,
        setStatusUser,
        isDelete,
        setIsDelete,
    } = useContext(ContextToolBar);

    const { user, setUser, setIsAuth } = useContext(Context);
    const navigate = useNavigate();

    const changeStatusUser = (status) => {
        userTable.forEach((user) => {
            if (selectedIds.includes(user.id)) {
                user.status = status;
            }
        });
        setStatusUser(!status);
        setSelectedIds([]);
    };

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
        check(email).then((data) => {
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
                    onClick={() => changeStatusUser("active")}>
                    <i className="fas fa-user" />
                </button>
                <button
                    type="button"
                    className="ms-1 btn btn-outline-dark"
                    onClick={() => changeStatusUser("blocked")}>
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
