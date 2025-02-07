import { useState } from "react";
import { Link } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const breedList = ['chihuahua', 'terrier']

export default function Search() {
    const [activeFilter, setActiveFilter] = useState("");

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
