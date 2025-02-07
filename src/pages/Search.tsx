import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { API_ENDPOINT } from "../App";

export default function Search() {
    const [activeFilter, setActiveFilter] = useState("");
    const [breedList, setBreedList] = useState([]);

    const getBreeds = () => {getData();}
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
            setBreedList(breeds);
        }
    }

    const handleFilterChange = (e: { target: { value: string; }; }) => {
        setActiveFilter(e.target.value);
    }

    return (
        <div className="page-container">
            <FormControl>
                <InputLabel>Breed</InputLabel>
                <Select
                    label="Breed"
                    value={activeFilter}
                    onChange={handleFilterChange}
                >
                    <MenuItem value=""></MenuItem>
                    {breedList.map(breed => <MenuItem key={breed} value={breed}>{breed}</MenuItem>)}
                </Select>
            </FormControl>
            <Link to="/"></Link>
        </div>
    );
}
