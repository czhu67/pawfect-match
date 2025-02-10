import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Match from "./pages/Match";

export const API_ENDPOINT = 'https://frontend-take-home-service.fetch.com';

export default function App() {
    const [auth, setAuth] = useState<boolean>(false);
    const unauthMsg = "Uh oh! Looks like you're not authorized."

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login setAuth={setAuth}/>}></Route>
                <Route path="/search" element={auth ? <Search /> : <div>{unauthMsg}</div>}></Route>
                <Route path="/match" element={auth ? <Match /> : <div>{unauthMsg}</div>}></Route>
            </Routes>
        </BrowserRouter>
    );
};
