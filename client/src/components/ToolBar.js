import React, { useContext } from "react";
import { ContextToolBar } from "../pages/UserTable";
import { check, deleteUser, updateUsersStatus } from "../http/userAPI";
import { Context } from "../App";

const ToolBar = () => {
    const {
        userTable,
        setUserTable,
        selectedIds,
        setSelectedIds,
        statusUser,
        setStatusUser,
        isDelete,
        setIsDelete,
    } = useContext(ContextToolBar);

    const { user, setUser, setIsAuth } = useContext(Context);

    const onChangeStatusUser = (status) => {
        updateUsersStatus(selectedIds, status)
            .then(() => {
                const updatedUsers = userTable.map((user) => {
                    if (selectedIds.includes(user.id)) {
                        return { ...user, status };
                    }
                    return user;
                });

                setUserTable(updatedUsers);
                setStatusUser(!status);
                setSelectedIds([]);
            })
            .catch((error) => {
                console.error("Error updating user status:", error);
            });
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
