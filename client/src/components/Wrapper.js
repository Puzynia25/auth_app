import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import NavBar from "./NavBar";
import AppRouter from "./AppRouter";
import { Context } from "../App";
import { check, logOutBlockedUser } from "../http/userAPI";

function Wrapper() {
    const { user, setUser, setIsAuth } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        check()
            .then((data) => {
                setUser(user);
                setIsAuth(true);
            })
            .catch((e) => {
                logOutBlockedUser(e, setUser, setIsAuth, navigate);
                console.log(e.response.data.message, "message");
            });
    }, []);

    return (
        <>
            <NavBar />
            <AppRouter />
        </>
    );
}

export default Wrapper;
