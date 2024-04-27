import { BrowserRouter } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import AppRouter from "./components/AppRouter";
import { check } from "./http/userAPI";
import { Spinner } from "./components/Spinner";
import NavBar from "./components/NavBar";

export const Context = createContext(null);

function App() {
    const [user, setUser] = useState({});
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check()
            .then((data) => {
                setUser(data);
                setIsAuth(true);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="mt-5 text-center">
                <Spinner />
            </div>
        );
    }

    return (
        <Context.Provider
            value={{
                user,
                setUser,
                isAuth,
                setIsAuth,
            }}>
            <BrowserRouter>
                <NavBar />
                <AppRouter />
            </BrowserRouter>
        </Context.Provider>
    );
}

export default App;
