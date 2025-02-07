import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";

export default function Login() {
    return (
        <div>
            <TextField id="standard-basic" label="Name" variant="standard" />
            <TextField id="standard-basic" label="Email" variant="standard" />
            <Link to="/search">
                <Button variant="contained">Log in</Button>
            </Link>
        </div>
    );
}
