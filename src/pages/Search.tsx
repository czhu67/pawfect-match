import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select } from "@mui/material";
import { API_ENDPOINT } from "../App";

export default function Search() {
    const [breedFilter, setBreedFilter] = useState([]);
    const [allBreeds, setAllBreeds] = useState([]);

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
    }

    const handleFilterChange = (e: { target: { value: string; }; }) => {
        console.log(e.target.value);
    }

    return (
        <div className="page-container">
            <FormControl>
                <InputLabel>Breed</InputLabel>
                <Select
                    label="Breed"
                    multiple={true}
                    value={breedFilter}
                    onChange={handleFilterChange}
                >
                    <MenuItem value=""></MenuItem>
                    {allBreeds.map(breed => (
                        <MenuItem key={breed} value={breed}>
                            <Checkbox checked={breedFilter.includes(breed)} />
                            <ListItemText primary={breed} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Link to="/"></Link>
        </div>
    );
}
