import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { API_ENDPOINT } from "../App";
import ResultsTable from "./components/ResultsTable";

export default function Search() {
    const [breedFilter, setBreedFilter] = useState<string[]>([]);
    const [allBreeds, setAllBreeds] = useState<string[]>([]);

    const getBreeds = () => { getData(); }
    useEffect(getBreeds, []);

    const getData = async () => {
        const response = await fetch(`${API_ENDPOINT}/dogs/breeds`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            credentials: 'include',
        });

        if (response.ok) {
            const breeds = await response.json();
            setAllBreeds(breeds);
        }
    };

    const handleFilterChange = (event: SelectChangeEvent<typeof breedFilter>) => {
        const filterList = typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;
        setBreedFilter(filterList);
    };

    return (
        <div className="page-container">
            <FormControl>
                <InputLabel>Filter by Breed</InputLabel>
                <Select
                    multiple
                    value={breedFilter}
                    onChange={handleFilterChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {allBreeds.map((breed) => (
                        <MenuItem key={breed} value={breed}>
                            <Checkbox checked={breedFilter.includes(breed)} />
                            <ListItemText primary={breed} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <ResultsTable />
            <Link to="/"></Link>
        </div>
    );
};
