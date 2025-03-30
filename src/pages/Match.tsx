import { Link } from "react-router-dom";

export default function Match({favList}: {favList: string[]}) {

    console.log(favList);
    return (
        <div>
            MATCHED!
            <Link to="/"></Link>
        </div>
    );
};
