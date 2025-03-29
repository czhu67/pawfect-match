import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Match from "./pages/Match";

export default function App() {
    const [auth, setAuth] = useState<boolean>(false);
    const [favs, setFavList] = useState<string[]>([]);

    const unauthDisplay = (<div id="unauth-container">
        <img src="./public/unauthorized.jpg" width="500px"/>
        <br/>
        <span>That's ruff! Looks like you're not authorized.</span>
    </div>);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login setAuth={setAuth} />}></Route>
                <Route path="/search" element={auth ? <Search /> : unauthDisplay}></Route>
                <Route path="/match" element={auth ? <Match favs={favs}/> : unauthDisplay}></Route>
            </Routes>
        </BrowserRouter>
    );
};
