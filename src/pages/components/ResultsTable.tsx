import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { ArrowDownward, ArrowUpward, Favorite, FavoriteBorder } from '@mui/icons-material';
import { getData, Sort } from "../../assets/utils";
import { DogData } from "../Search";

interface ResultsTableProps {
    dogData: DogData;
    sort: Sort;
    setSort: (sort: Sort) => void;
    favList: string[];
    setFavList: (favList: string[]) => void;
};

interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
};

export default function ResultsTable({ dogData, sort, setSort, favList, setFavList }: ResultsTableProps) {
    const [dogList, setDogList] = useState<Dog[]>([]);

    const arrowVisCheck = (field: string) => `sort-arrow ${Object.keys(sort).includes(field) ? "arrow-visible" : null}`;

    useEffect(() => {
        getDogs();
    }, [dogData]);

    const getDogs = async () => {
        const response = await getData('/dogs', 'POST', JSON.stringify(dogData.resultIds));

        if (response.ok) {
            const dogs = await response.json();
            setDogList(dogs);
        }
    }

    const toggleSort = (field: 'name' | 'age' | 'breed') => {
        const newSort: Sort = {};

        if (sort[field] == 'asc' && Object.keys(sort).includes(field)) {
            newSort[field] = 'desc'
            setSort(newSort);
        } else if (sort[field] == 'desc' || !Object.keys(sort).includes(field)) {
            newSort[field] = 'asc'
            setSort(newSort);
        }
    };

    const toggleFav = (dogId: string) => {
        if (favList.includes(dogId)) {
            const copyFavList = [...favList];
            const index = favList.indexOf(dogId);
            copyFavList.splice(index, 1);
            console.log(copyFavList);
            setFavList(copyFavList);
        } else {
            setFavList([...favList, dogId]);
        }
    };

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell id="fav-col-header">
                        {favList.length ? <Favorite id="fav-header" className="fav" /> : <FavoriteBorder id="fav-header" className="fav-border" />}
                    </TableCell>
                    <TableCell id="img-col-header">Image</TableCell>
                    <TableCell id="name-col-header" onClick={() => toggleSort('name')}>
                        <div className="table-header-wrapper">
                            Name {sort.name === 'desc' ? <ArrowDownward className={arrowVisCheck('name')} /> : <ArrowUpward className={arrowVisCheck('name')} />}
                        </div>
                    </TableCell>
                    <TableCell onClick={() => toggleSort('age')}>
                        <div id="age-col-header" className="table-header-wrapper">
                            Age {sort.age === 'desc' ? <ArrowDownward className={arrowVisCheck('age')} /> : <ArrowUpward className={arrowVisCheck('age')} />}
                        </div>
                    </TableCell>
                    <TableCell id="zip-col-header" align="center">Zip Code</TableCell>
                    <TableCell id="breed-col-header" onClick={() => toggleSort('breed')}>
                        <div className="table-header-wrapper">
                            Breed {sort.breed === 'desc' ? <ArrowDownward className={arrowVisCheck('breed')} /> : <ArrowUpward className={arrowVisCheck('breed')} />}
                        </div>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {dogList.map((dog) => {
                    return (
                        <TableRow key={dog.id}>
                            <TableCell className="fav-cell">
                                <IconButton value={dog.id} onClick={() => toggleFav(dog.id)}>
                                    {favList.includes(dog.id) ?
                                        <Favorite className="fav" /> :
                                        <FavoriteBorder className="fav-border" />}
                                </IconButton>
                            </TableCell>
                            <TableCell className="img-cell"><a target="_blank" href={dog.img}><img className="dog-img" src={dog.img} /></a></TableCell>
                            <TableCell>{dog.name}</TableCell>
                            <TableCell>{dog.age}</TableCell>
                            <TableCell align="center">{dog.zip_code}</TableCell>
                            <TableCell>{dog.breed}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table >
    );
};