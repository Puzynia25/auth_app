import { $authHost, $host } from ".";
import { jwtDecode } from "jwt-decode";

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

export const login = async (name, email, password) => {
    const { data } = await $host.post("api/user/login", {
        name,
        email,
        password,
    });

    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
};

export const check = async (email) => {
    const { data } = await $host.post("api/user/check", { email });
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
    return $authHost.patch("api/user/status", { ids, status });
};
