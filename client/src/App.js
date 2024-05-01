import { BrowserRouter } from "react-router-dom";
import { createContext, useState } from "react";
import Wrapper from "./components/Wrapper";

export const Context = createContext(null);

function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
    const [isAuth, setIsAuth] = useState(false);

    return (
        <Context.Provider
            value={{
                user,
                setUser,
                isAuth,
                setIsAuth,
            }}>
            <BrowserRouter>
                <Wrapper />
            </BrowserRouter>
        </Context.Provider>
    );
}

export default App;
