import { $authHost, $host } from ".";
import { jwtDecode } from "jwt-decode";

// export const createUser = async (name, email, password) => {
//     const { data } = await $host.post("api/user/registration", {
//         name,
//         email,
//         password,
//         status: "active",
//     });
//     return jwtDecode(data.token);
// };

//получение всех пользователей из БД
export const fetchAllUsers = async () => {
    const { data } = await $authHost.get("api/user/table");
    return data;
};
