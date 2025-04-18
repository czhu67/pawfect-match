import { useState } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Search from "./pages/Search";
import Match from "./pages/Match";

export default function App() {
    const [auth, setAuth] = useState<boolean>(false);
    const [favList, setFavList] = useState<string[]>([]);
    const [matchId, setMatchId] = useState<string>("");
    const unauthDisplay = (<div id="unauth-container">
        <img src="/unauthorized.jpg" width="500px" />
        <br />
        <p>That's ruff! Looks like you're not authorized.</p>
        <Link to="/" style={{cursor: "pointer"}}>Log In</Link>
    </div>);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login setAuth={setAuth} />}></Route>
                <Route path="/search" element={auth ? <Search favList={favList} setFavList={setFavList} /> : unauthDisplay}></Route>
                <Route path="/match" element={auth ? <Match favList={favList} matchId={matchId} setMatchId={setMatchId} /> : unauthDisplay}></Route>
            </Routes>
        </BrowserRouter>
    );
};
