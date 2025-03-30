import { useEffect, useState } from "react";
import { Card, CardContent, Grid2 as Grid, Typography } from "@mui/material";

import { Dog, getData, getDogs } from "../assets/utils";
import Header from "./components/Header";

interface MatchProps {
    favList: string[];
    matchId: string;
    setMatchId: (matchId: string) => void;
}

export default function Match({ favList, matchId, setMatchId }: MatchProps) {
    const [dog, setDog] = useState<Dog[]>([]);

    useEffect(() => {
        if (!matchId) {
            getMatch();
        }
    }, []);

    useEffect(() => {
        getDogs([matchId], setDog);
    }, [matchId]);

    const getMatch = async () => {
        const response = await getData('/dogs/match', 'POST', JSON.stringify(favList));
        if (response.ok) {
            const matchResponse = await response.json();
            setMatchId(matchResponse.match || "");
        }
    }

    return (
        <div className="page-container">
            <Header />
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
