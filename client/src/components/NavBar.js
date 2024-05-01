import { NavLink, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { useContext, useEffect } from "react";
import { Context } from "../App";

import { check, logOutBlockedUser } from "../http/userAPI";

const NavBar = () => {
    const { user, setUser, isAuth, setIsAuth } = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem("user");
        setUser({});
        setIsAuth(false);
    };

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
        <nav className="navbar-expand-lg bg-body-tertiary ">
            <div className="py-2 w-75 mx-auto">
                <div className="">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-3">
                            <NavLink className="nav-link active" to={REGISTRATION_ROUTE}>
                                Auth app
                            </NavLink>
                        </div>
                        {isAuth ? (
                            <div className="d-flex align-items-center">
                                <div>{user.email}</div>
                                <button
                                    className="btn btn-outline-success ms-4"
                                    onClick={() => logOut()}>
                                    Log out
                                </button>
                            </div>
                        ) : (
                            <div className="d-flex align-items-center">
                                <button
                                    className="btn btn-outline-dark ms-2"
                                    onClick={() => {
                                        navigate(LOGIN_ROUTE);
                                    }}>
                                    Log In
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
