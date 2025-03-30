import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";

interface BreedSelectProps {
    breedFilter: string[];
    setBreedFilter: (breedList: string[]) => void;
    allBreeds: string[];
};

export default function BreedSelect({ breedFilter, setBreedFilter, allBreeds }: BreedSelectProps) {
    const handleBreedFilterChange = (e: SelectChangeEvent<typeof breedFilter>) => {
        const filterList = typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value;
        setBreedFilter(filterList);
    };

    return (
        <FormControl>
            <InputLabel id="breed-label">Breeds</InputLabel>
            <Select
                labelId="breed-label"
                multiple
                value={breedFilter}
                onChange={handleBreedFilterChange}
                input={<OutlinedInput label="Breeds" />}
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
    );
};
