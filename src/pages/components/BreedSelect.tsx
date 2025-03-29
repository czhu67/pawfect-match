import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";

interface BreedSelectProps {
    breedFilter: string[];
    setBreedFilter: (breedList: string[]) => void;
    allBreeds: string[];
};

export default function BreedSelect({ breedFilter, setBreedFilter, allBreeds }: BreedSelectProps) {
    const handleBreedFilterChange = (event: SelectChangeEvent<typeof breedFilter>) => {
        const filterList = typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;
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
