import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { ArrowDownward, ArrowUpward, Favorite, FavoriteBorder } from '@mui/icons-material';
import { getData, Sort } from "../../assets/utils";
import { DogData } from "../Search";

interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
};

interface ResultsTableProps {
    dogData: DogData,
    sort: Sort,
    setSort: React.Dispatch<React.SetStateAction<Sort>>
};

export default function ResultsTable({ dogData, sort, setSort }: ResultsTableProps) {
    const [dogList, setDogList] = useState<Dog[]>([]);

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

    const toggleSort = (e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
        const innerText = (e.target as Element).parentElement?.innerText;
        const field: string | 'breed' | 'name' | 'age' | undefined = innerText?.toLowerCase();

        const newSort: Sort = {};

        if (field == 'breed' || field == 'name' || field == 'age') {
            if (sort[field] == 'ASC') {
                newSort[field] = 'DSC'
                setSort(newSort);
            } else {
                newSort[field] = 'ASC'
                setSort(newSort);
            }
        }

    };

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell id="fav-col-header"><div className="table-header-wrapper"><FavoriteBorder /></div></TableCell>
                        <TableCell id="img-col-header">Image</TableCell>
                        <TableCell id="name-col-header">Name</TableCell>
                        <TableCell align="center">Age</TableCell>
                        <TableCell align="center">Zip Code</TableCell>
                        <TableCell id="breed-col-header" onClick={toggleSort}>
                            <div className="table-header-wrapper">
                                Breed {sort.breed === 'ASC' ? <ArrowUpward /> : <ArrowDownward />}
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dogList.map((dog) => (
                        <TableRow key={dog.id}>
                            <TableCell className="fav-cell"><FavoriteBorder className="fav-border"/></TableCell>
                            <TableCell className="img-cell"><a target="_blank" href={dog.img}><img className="dog-img" src={dog.img} /></a></TableCell>
                            <TableCell>{dog.name}</TableCell>
                            <TableCell align="center">{dog.age}</TableCell>
                            <TableCell align="center">{dog.zip_code}</TableCell>
                            <TableCell>{dog.breed}</TableCell>
                        </TableRow>
                    ))}
                    {/* This is for the extra blank pages if there isn't enough dogs on one page - not necessary, just a style choice */}
                    {/* {dogList.length < ROWS_PER_PAGE && dogList.length > ROWS_PER_PAGE ?
                        <TableRow style={{
                            height: 53 * (ROWS_PER_PAGE - dogList.length),
                        }} /> : null} */}
                </TableBody>
            </Table>
        </div>
    );
};