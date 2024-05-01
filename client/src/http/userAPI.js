import { $authHost, $host } from ".";
import { jwtDecode } from "jwt-decode";
import { LOGIN_ROUTE } from "../utils/consts";

export const registration = async (name, email, password) => {
    const { data } = await $host.post("api/user/registration", {
        name,
        email,
        password,
        status: "active",
    });
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
};

export const login = async (email, password) => {
    const { data } = await $host.post("api/user/login", {
        email,
        password,
    });

    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
};

export const check = async () => {
    const { data } = await $authHost.get("api/user/check");
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
};

export const isFindUser = async (email) => {
    const { data } = await $host.post("api/user/", { email });
    return data.exists;
};

export const fetchAllUsers = async () => {
    const { data } = await $authHost.get("api/user/table");
    return data;
};

export const deleteUser = async (id) => {
    const { data } = await $authHost.delete("api/user/delete", {
        data: { id: id },
    });
    return data;
};

export const updateUsersStatus = async (ids, status) => {
    return await $authHost.patch("api/user/status", { ids, status });
};

export const logOutBlockedUser = (e, setUser, setIsAuth, navigate) => {
    if (e.response.data.message === "Your account is blocked!") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser({});
        setIsAuth(false);
        navigate(LOGIN_ROUTE);
    }
    return;
};
