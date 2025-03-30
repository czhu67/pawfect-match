import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid2 as Grid, TablePagination } from "@mui/material";
import { Pets } from '@mui/icons-material';

import { getData, Sort } from "../assets/utils";
import ResultsTable from "./components/ResultsTable";
import BreedSelect from "./components/BreedSelect";
import ZipInput from "./components/ZipInput";
import AgeSlider from "./components/AgeSlider";
import Header from "./components/Header";

interface SearchProps {
    favList: string[];
    setFavList: (favList: string[]) => void;
};

export interface DogData {
    resultIds: string[];
    total: number;
    next?: string;
    prev?: string;
};

export default function Search({ favList, setFavList }: SearchProps) {
    const [breedFilter, setBreedFilter] = useState<string[]>([]);
    const [allBreeds, setAllBreeds] = useState<string[]>([]);
    const [ageRange, setAgeRange] = useState([0, 15]);
    const [zipCodes, setZipCodes] = useState<string[]>([]);
    const [dogSearch, setDogSearch] = useState<DogData>({ resultIds: [], total: 0 });
    const [sort, setSort] = useState<Sort>({ breed: 'asc' });
    const [page, setPage] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getBreeds();
        searchDogs();
    }, [sort]);

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
            const dogData = await response.json();
            setDogSearch(dogData);
            setPage(0);
        }
    }

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
            <Header />
            <Grid container size={12} spacing={2}>
                <Grid size={3.5} sx={{ display: "flex", flexDirection: "column" }}>
                    <BreedSelect breedFilter={breedFilter} setBreedFilter={setBreedFilter} allBreeds={allBreeds} />
                </Grid>
                <Grid size={3.5}>
                    <ZipInput setZipCodes={setZipCodes} />
                </Grid>
                <Grid size={3.5} sx={{ textAlign: "center" }}>
                    <AgeSlider ageRange={ageRange} setAgeRange={setAgeRange} />
                </Grid>
                <Grid size={1.5} sx={{ alignContent: "center", textAlign: "right" }}>
                    <Button id="search-button" variant="contained" onClick={searchDogs}>Search</Button>
                </Grid>
                <Grid size={12}>
                    <Button
                        id="match-button"
                        variant="contained"
                        size="large"
                        disabled={favList.length ? false : true}
                        onClick={() => navigate('/match')}
                        startIcon={favList.length ? <Pets /> : null}
                        endIcon={favList.length ? <Pets /> : null}>
                        {favList.length ? "match me!" : "Favorite some pups to find your match!"}
                    </Button>
                </Grid>
                <Grid size={12}>
                    <ResultsTable dogData={dogSearch} sort={sort} setSort={setSort} favList={favList} setFavList={setFavList} />
                </Grid>
            </Grid>
            <TablePagination
                slots={{ root: 'div' }}
                count={dogSearch.total || 0}
                page={page}
                rowsPerPageOptions={[]}
                onPageChange={handleChangePage}
                rowsPerPage={dogSearch.resultIds?.length || 0}
            />
        </div>
    );
};
