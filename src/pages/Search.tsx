import { useEffect, useState } from "react";
import { Autocomplete, Button, Chip, FormControl, Grid2, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Slider, TablePagination, TextField } from "@mui/material";
import ResultsTable from "./components/ResultsTable";
import { getData, Sort } from "../assets/utils";

export interface DogData {
    resultIds?: string[],
    total?: number
    next?: string,
    prev?: string,
}

export default function Search() {
    const [breedFilter, setBreedFilter] = useState<string[]>([]);
    const [allBreeds, setAllBreeds] = useState<string[]>([]);
    const [ageRange, setAgeRange] = useState([0, 15]);
    const [zipCodes, setZipCodes] = useState<string[]>([]);
    const [dogSearch, setDogSearch] = useState<DogData>({ next: "", resultIds: [], total: 0 });
    const [sort, setSort] = useState<Sort>({ breed: 'asc' });
    const [page, setPage] = useState(0);
    const ROWS_PER_PAGE = 25;

    useEffect(() => {
        getBreeds();
        searchDogs();
    }, []);

    const getBreeds = async () => {
        const response = await getData('/dogs/breeds', 'GET');

        if (response.ok) {
            const breeds = await response.json();
            setAllBreeds(breeds);
        }
    };

    const searchDogs = async () => {
        const urlParams = new URLSearchParams();
        const paramValues = {
            breeds: breedFilter,
            zipCodes: zipCodes,
            ageMin: String(ageRange[0]),
            ageMax: String(ageRange[1]),
            sort,
        };

        for (const [key, value] of Object.entries(paramValues)) {
            if (Array.isArray(value)) {
                for (const option of value) {
                    urlParams.append(key + "[]", option);
                }
            } else if (typeof value === 'object') {
                urlParams.append(key, `${Object.keys(value)[0]}:${Object.values(value)[0]}`);
            } else if (value) {
                urlParams.append(key, value);
            }
        }

        const response = await getData(`/dogs/search?${urlParams.toString()}`, 'GET');

        if (response.ok) {
            const dogIds = await response.json();
            setDogSearch(dogIds);
            setPage(0);
        }
    }

    const handleBreedFilterChange = (event: SelectChangeEvent<typeof breedFilter>) => {
        const filterList = typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;
        setBreedFilter(filterList);
    };

    const handleAgeChange = (_: Event, newValue: number | number[]) => {
        setAgeRange(newValue as number[]);
    };

    const handleChangePage = async (_: unknown, newPage: number) => {
        let endpoint = dogSearch.next;
        if (newPage < page && dogSearch.prev) {
            endpoint = dogSearch.prev;
        }

        if (endpoint) {
            const response = await getData(endpoint, 'GET');

            if (response.ok) {
                const dogIds = await response.json();
                setDogSearch(dogIds);
                setPage(newPage);
            }
        }
    };

    return (
        <div className="page-container">
            <Grid2 container size={12} spacing={2}>
                <Grid2 size={3.5} sx={{ display: "flex", flexDirection: "column" }}>
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
                </Grid2>
                <Grid2 size={3.5}>
                    <Autocomplete
                        className="zip-input"
                        options={[]}
                        freeSolo
                        multiple
                        renderTags={(value, props) =>
                            <div id="chip-container">
                                {value.slice(0).reverse().map((option, index) => (
                                    <Chip label={option} {...props({ index: value.length - index - 1 })} />
                                ))}
                            </div>
                        }
                        renderInput={(params) => <TextField label="Zip Codes" {...params} />}
                        onChange={(_, newValue) => {
                            setZipCodes(newValue)
                        }}
                    />
                </Grid2>
                <Grid2 size={3.5} sx={{ textAlign: "center" }}>
                    <InputLabel>Age Range</InputLabel>
                    <Slider
                        sx={{ width: "90%", '& .MuiSlider-valueLabel': { backgroundColor: "unset", top: "2em", fontSize: "0.7em" } }}
                        value={ageRange}
                        onChange={handleAgeChange}
                        valueLabelDisplay="on"
                        max={15}
                    />
                </Grid2>
                <Grid2 size={1.5} sx={{ alignContent: "center", textAlign: "right" }}>
                    <Button id="search-button" variant="contained" onClick={searchDogs}>Search</Button>
                </Grid2>
            </Grid2>
            <ResultsTable dogData={dogSearch} sort={sort} setSort={setSort} />
            <TablePagination
                count={dogSearch.total || 0}
                page={page}
                rowsPerPageOptions={[]}
                onPageChange={handleChangePage}
                rowsPerPage={ROWS_PER_PAGE}
            />
        </div>
    );
};
