import { NavLink, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, USERTABLE_ROUTE } from "../utils/consts";
import { useContext } from "react";
import { Context } from "../App";

const NavBar = () => {
    const { user, setUser, isAuth, setIsAuth } = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        setUser({});
        setIsAuth(false);
    };

    return (
        <nav className="navbar-expand-lg bg-body-tertiary ">
            <div className="py-2 w-75 mx-auto">
                <div className="">
                    <div className="d-flex justify-content-between align-items-center">
                        <NavLink className="nav-link active" to={USERTABLE_ROUTE}>
                            Home
                        </NavLink>
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