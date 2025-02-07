import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Result from "./pages/Result";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/search" element={<Search />}></Route>
                <Route path="/result" element={<Result />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
