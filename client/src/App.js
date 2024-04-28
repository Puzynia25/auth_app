import { BrowserRouter } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import AppRouter from "./components/AppRouter";

export const Context = createContext(null);

function App() {
    const [user, setUser] = useState({});
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuth(true);
        }
    }, []);

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
