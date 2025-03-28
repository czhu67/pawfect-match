import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Checkbox, Grid2, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, Slider, TextField } from "@mui/material";
import { API_ENDPOINT } from "../App";
import ResultsTable from "./components/ResultsTable";
import { getData } from "../assets/utils";

export default function Search() {
    const [breedFilter, setBreedFilter] = useState<string[]>([]);
    const [allBreeds, setAllBreeds] = useState<string[]>([]);
    const [ageRange, setAgeRange] = useState([0, 30]);
    const [zipCode, setZipCode] = useState('');
    const [dogSearch, setDogSearch] = useState([]);
    const [order, setOrder] = useState('ASC');

    useEffect(() => {
        getBreeds();
        getDogs();
    }, []);

    const getBreeds = async () => {
        const response = await getData('/dogs/breeds', 'GET');

        if (response.ok) {
            const breeds = await response.json();
            setAllBreeds(breeds);
        }
    };

    const getDogs = async () => {
        const urlParams = new URLSearchParams();
        const paramValues = {
            breeds: JSON.stringify(breedFilter),
            zipCodes: JSON.stringify([zipCode]),
            ageMin: String(ageRange[0]),
            ageMax: String(ageRange[1]),
        };

        for (const key in paramValues) {
            if (Boolean(paramValues[key])) {
                urlParams.append(key, JSON.stringify(paramValues[key]));
            }
        }

        const params = new URLSearchParams({"breed": "null"});
        console.log(params.toString());
        const response = await getData(`/dogs/search?${''}`, 'GET');

        if (response.ok) {
            const dogIds = await response.json();
            setDogSearch(dogIds);
            console.log(dogIds);
        }
    }

    const handleBreedFilterChange = (event: SelectChangeEvent<typeof breedFilter>) => {
        const filterList = typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;
        setBreedFilter(filterList);
    };

    const handleAgeChange = (event: Event, newValue: number | number[]) => {
        setAgeRange(newValue as number[]);
    };

    return (
        <div className="page-container">
            <Grid2 container size={12} spacing={2}>
                <Grid2 size={3.5} sx={{ display: "flex", flexDirection: "column" }}>
                    <Select
                        sx={{ height: "100%" }}
                        multiple
                        displayEmpty
                        value={breedFilter}
                        onChange={handleBreedFilterChange}
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return <span style={{ color: "rgba(0, 0, 0, 0.6)" }}>Breed</span>;
                            }
                            return selected.join(', ');
                        }}
                    >
                        {allBreeds.map((breed) => (
                            <MenuItem key={breed} value={breed}>
                                <Checkbox checked={breedFilter.includes(breed)} />
                                <ListItemText primary={breed} />
                            </MenuItem>
                        ))}
                    </Select>
                </Grid2>
                <Grid2 size={3.5}>
                    <TextField sx={{ width: "100%" }} label="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                </Grid2>
                <Grid2 size={3.5} sx={{ textAlign: "center" }}>
                    <InputLabel>Age</InputLabel>
                    <Slider
                        sx={{ width: "90%" }}
                        value={ageRange}
                        onChange={handleAgeChange}
                        valueLabelDisplay="auto"
                        max={20}
                    />
                </Grid2>
                <Grid2 size={1.5} sx={{ alignContent: "center", textAlign: "right" }}>
                    <Button variant="contained" onClick={getDogs}>Search</Button>
                </Grid2>
            </Grid2>
            <ResultsTable dogIdList={dogSearch} order={order} setOrder={setOrder}/>
            <Link to="/"></Link>
        </div>
    );
};
