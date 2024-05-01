import React, { createContext, useContext, useEffect, useState } from "react";
import ToolBar from "../components/ToolBar";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { Context } from "../App";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchAllUsers, logOutBlockedUser } from "../http/userAPI";

export const ContextToolBar = createContext(null);

const UserTable = () => {
    const { isAuth, setUser, setIsAuth } = useContext(Context);
    const [userTable, setUserTable] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedAll, setSelectedAll] = useState(false);
    const [statusUser, setStatusUser] = useState(true);
    const [isDelete, setIsDelete] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        fetchAllUsers()
            .then((data) => setUserTable(data))
            .catch((e) => logOutBlockedUser(e, setUser, setIsAuth, navigate));
    }, [isDelete]);

    useEffect(() => {
        setSelectedAll(selectedIds.length === userTable.length);
    }, [selectedIds, userTable, statusUser]);

    const formattedDate = (currentDate) => {
        const date = new Date(currentDate);

        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");

        const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

        return formattedDate;
    };

    const handleSelectedAllChange = (event) => {
        const isChecked = event.target.checked;
        setSelectedAll(isChecked);

        if (isChecked) {
            setSelectedIds(userTable.map((item) => item.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleCheckboxChange = (event, id) => {
        const isChecked = event.target.checked;

        setSelectedIds((prevSelectedItems) => {
            if (isChecked) {
                return [...prevSelectedItems, id];
            } else {
                return prevSelectedItems.filter((itemId) => itemId !== id);
            }
        });
    };

    return (
        <>
            <ContextToolBar.Provider
                value={{
                    userTable,
                    setUserTable,
                    selectedIds,
                    setSelectedIds,
                    setStatusUser,
                    isDelete,
                    setIsDelete,
                }}>
                <ToolBar />
            </ContextToolBar.Provider>

            <div className="w-75 mx-auto mt-4">
                <table className="table table-bordered">
                    <thead className="align-middle">
                        <tr>
                            <th className="text-center">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    checked={selectedAll}
                                    onChange={handleSelectedAllChange}
                                />
                            </th>
                            <th>#</th>
                            <th>name</th>
                            <th>email</th>
                            <th>sign up at</th>
                            <th>log in at</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody className="align-middle">
                        {isAuth ? (
                            userTable.map((raw) => (
                                <tr key={raw.id}>
                                    <td className="text-center">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            checked={selectedIds.includes(raw.id)}
                                            onChange={(e) => handleCheckboxChange(e, raw.id)}
                                        />
                                    </td>
                                    <td>{raw.id}</td>
                                    <td>{raw.name}</td>
                                    <td>{raw.email}</td>
                                    <td>{formattedDate(raw.createdAt)}</td>
                                    <td>{formattedDate(raw.updatedAt)}</td>
                                    <td>
                                        <p
                                            className={
                                                raw.status === "active"
                                                    ? "badge text-bg-success mb-0 status"
                                                    : "badge text-bg-danger mb-0 status"
                                            }>
                                            {raw.status}
                                        </p>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center">
                                    to be able to see the user table you need{" "}
                                    <NavLink
                                        to={LOGIN_ROUTE}
                                        className="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                                        log in
                                    </NavLink>{" "}
                                    or{" "}
                                    <NavLink
                                        to={REGISTRATION_ROUTE}
                                        className="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                                        sign up
                                    </NavLink>
                                    ...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default UserTable;
