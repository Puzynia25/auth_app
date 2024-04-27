import React, { createContext, useContext, useEffect, useState } from "react";
import ToolBar from "../components/ToolBar";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { Context } from "../App";
import { NavLink } from "react-router-dom";
import { fetchAllUsers } from "../http/userTableAPI";

export const ContextToolBar = createContext(null);

const UserTable = () => {
    const { isAuth } = useContext(Context);
    const [userTable, setUserTable] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedAll, setSelectedAll] = useState(false);
    const [statusUser, setStatusUser] = useState(true);
    const [deleteUser, setDeleteUser] = useState(false);

    useEffect(() => {
        fetchAllUsers()
            .then((data) => setUserTable(data))
            .finally(() => console.log(userTable));
    }, []);

    useEffect(() => {
        setSelectedAll(selectedItems.length === userTable.length);
    }, [selectedItems, userTable, statusUser]);

    const handleSelectedAllChange = (event) => {
        const isChecked = event.target.checked;
        setSelectedAll(isChecked);

        if (isChecked) {
            setSelectedItems(userTable.map((item) => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleCheckboxChange = (event, id) => {
        const isChecked = event.target.checked;

        setSelectedItems((prevSelectedItems) => {
            if (isChecked) {
                return [...prevSelectedItems, id];
            } else {
                return prevSelectedItems.filter((itemId) => itemId !== id);
            }
        });
    };

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
    return (
        <>
            <ContextToolBar.Provider
                value={{
                    userTable,
                    selectedItems,
                    setSelectedItems,
                    setStatusUser,
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
                                            checked={selectedItems.includes(raw.id)}
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
