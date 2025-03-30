import { useNavigate } from "react-router-dom";
import { Grid2 as Grid, IconButton, Typography } from "@mui/material";
import { Logout, Pets } from "@mui/icons-material";

export default function Header() {
    const navigate = useNavigate();

    const logout = () => {
        navigate('/');
        window.location.reload();
    };

    return (
        <Grid container id="header">
            <Grid size={11}>
                <Typography variant="h4">Pawfect Match <Pets /></Typography>
            </Grid>
            <Grid size={1} display="flex" justifyContent="end" alignItems="center">
                <IconButton aria-label="delete" onClick={logout}>
                    <Logout />
                </IconButton>
            </Grid>
        </Grid>
    )
}