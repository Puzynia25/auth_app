import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, USERTABLE_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { Context } from "../App";

const Auth = () => {
    const { user, setUser, isAuth, setIsAuth } = useContext(Context);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const click = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(name, email, password);
            }

            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
            setIsAuth(true);
            navigate(USERTABLE_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }
        setLoading(false);
    };

    return (
        <div className="w-25 mx-auto mt-5">
            <form className="border p-3 rounded ">
                <p className="text-center fw-bold">{isLogin ? "Log in" : "Sign up"}</p>
                {!isLogin ? (
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                ) : null}
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="btn btn-success w-100 rounded-pill"
                        disabled={loading}
                        onClick={(e) => click(e)}>
                        Continue
                    </button>
                    {isLogin ? (
                        <div className="mt-4" style={{ fontSize: "small" }}>
                            <p className="mb-0 d-inline-block">Don't have an account?</p>
                            <div className="ms-1 d-inline-block">
                                <NavLink
                                    to={REGISTRATION_ROUTE}
                                    className="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                                    sign up
                                </NavLink>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-4" style={{ fontSize: "small" }}>
                            <p className="mb-0 d-inline-block">Do you have an account?</p>

                            <div className="ms-1 d-inline-block">
                                <NavLink
                                    to={LOGIN_ROUTE}
                                    className="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                                    log in
                                </NavLink>
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Auth;
