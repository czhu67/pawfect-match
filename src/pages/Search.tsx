import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Autocomplete, Button, Chip, FormControl, Grid2, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Slider, TextField } from "@mui/material";
import ResultsTable from "./components/ResultsTable";
import { getData } from "../assets/utils";

export default function Search() {
    const [breedFilter, setBreedFilter] = useState<string[]>([]);
    const [allBreeds, setAllBreeds] = useState<string[]>([]);
    const [ageRange, setAgeRange] = useState([0, 30]);
    const [zipCodes, setZipCodes] = useState<string[]>([]);
    const [dogSearch, setDogSearch] = useState({ next: "", resultIds: [], total: 0});

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
    console.log(dogSearch);

    const getDogs = async () => {
        const urlParams = new URLSearchParams();
        const paramValues = {
            breeds: JSON.stringify(breedFilter),
            zipCodes: JSON.stringify(zipCodes),
            ageMin: String(ageRange[0]),
            ageMax: String(ageRange[1]),
        };

        for (const [key, value] of Object.entries(paramValues)) {
            if (value) {
                urlParams.append(key, JSON.stringify(value));
            }
        }

        const response = await getData(`/dogs/search?${''}`, 'GET');

        if (response.ok) {
            const dogIds = await response.json();
            setDogSearch(dogIds);
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
                    <FormControl>
                        <InputLabel id="breed-label">Breed</InputLabel>
                        <Select
                            labelId="breed-label"
                            multiple
                            value={breedFilter}
                            onChange={handleBreedFilterChange}
                            input={<OutlinedInput label="Breed" />}
                        >
                            {allBreeds.map((breed) => (
                                <MenuItem
                                    key={breed}
                                    value={breed}
                                >
                                    {breed}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 size={3.5}>
                    <Autocomplete
                        options={[]}
                        freeSolo
                        multiple
                        renderTags={(value, props) =>
                            value.map((option, index) => (
                                <Chip label={option} {...props({ index })} />
                            ))
                        }
                        renderInput={(params) => <TextField label="Zip Code" {...params} />}
                        onChange={(event, newValue) => {
                            setZipCodes(newValue)
                        }}
                    />
                </Grid2>
                <Grid2 size={3.5} sx={{ textAlign: "center" }}>
                    <InputLabel>Age</InputLabel>
                    <Slider
                        sx={{ width: "90%", '& .MuiSlider-valueLabel': { backgroundColor: "unset", top: "2em", fontSize: "0.7em" } }}
                        value={ageRange}
                        onChange={handleAgeChange}
                        valueLabelDisplay="on"
                        max={15}
                    />
                </Grid2>
                <Grid2 size={1.5} sx={{ alignContent: "center", textAlign: "right" }}>
                    <Button id="search-button" variant="contained" onClick={getDogs}>Search</Button>
                </Grid2>
            </Grid2>
            <ResultsTable dogData={dogSearch}/>
        </div>
    );
};
