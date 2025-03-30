import { useEffect, useState } from "react";
import { Dog, getData, getDogs } from "../assets/utils";
import { Card, CardContent, Grid2 as Grid, Typography } from "@mui/material";
import { Pets } from "@mui/icons-material";

export default function Match({ favList }: { favList: string[] }) {
    const [matchId, setMatchId] = useState<string>("");
    const [err, setErr] = useState(false);
    const [dog, setDog] = useState<Dog[]>([]);

    useEffect(() => {
        getMatch();
    }, []);

    useEffect(() => {
        getDogs([matchId], setDog);
    }, [matchId]);

    console.log(dog);

    const getMatch = async () => {
        const response = await getData('/dogs/match', 'POST', JSON.stringify(favList));
        if (response.ok) {
            const matchResponse = await response.json();
            setMatchId(matchResponse.match || "");
        } else {
            setErr(true);
        }
    }

    return (
        <div className="page-container">
            {err || !dog.length ? <Typography>Uh oh! There was an error finding your match. Please try again at a later time.</Typography> : null}
            {dog.length ?
                <Card id="match-card">
                    <CardContent id="match-card-content">
                        <Typography variant="h4">
                            🎊 Congrats! 🎊
                        </Typography>
                        <Typography variant="h5">
                            You matched with {dog[0].name}!
                        </Typography>
                        <img id="match-dog-img" src={dog[0].img} />
                        <Grid container id="dog-bio">
                            <Grid size={9}>
                                <Typography variant="h6">
                                    Breed: {dog[0].breed}
                                    <br />
                                    Age: {dog[0].age}
                                    <br />
                                    Zip Code: {dog[0].zip_code}
                                </Typography>
                            </Grid>
                            <Grid size={3}>
                                <Typography id="match-emoji" variant="h2">🐾</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card> :
                <Typography>Loading...</Typography>
            }
        </div>
    );
};
