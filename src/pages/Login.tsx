import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { getData } from "../assets/utils";

export default function Login({ setAuth }: { setAuth: (auth: boolean) => void }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState('');

    const handleNameChange = (e: { target: { value: string; }; }) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: { target: { value: string; }; }) => {
        setEmail(e.target.value)
    };

    const handleSubmit = async () => {
        if (name && email) {
            const body = JSON.stringify({
                'email': email,
                'name': name,
            });
            const response = await getData('/auth/login', 'POST', body);

            if (response.ok) {
                setAuth(true);
                navigate('/search');
            } else {
                setErrMsg('Please ensure all fields are filled in correctly.');
            }
        } else {
            setErrMsg('Please ensure all fields are filled in.');
        }
    };

    return (
        <div id="login-component" className="page-container">
            <Typography variant="h2">Pawfect Match</Typography>
            <div id="login-form">
                <TextField label="Name" required={true} variant="standard" onChange={handleNameChange} />
                <TextField label="Email" required={true} type="email" variant="standard" onChange={handleEmailChange} />
                <Button id="login-button" variant="contained" onClick={handleSubmit}>Log in</Button>
                {errMsg ? <i>{errMsg}</i> : null}
            </div>
        </div>
    );
}
