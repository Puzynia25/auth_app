import Auth from "./pages/Auth";
import UserTable from "./pages/UserTable";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, USERTABLE_ROUTE } from "./utils/consts";

export const authRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <Auth />,
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Auth />,
    },
    {
        path: USERTABLE_ROUTE,
        Component: <UserTable />,
    },
];

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <Auth />,
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Auth />,
    },
];
