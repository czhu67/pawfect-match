import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
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

    useEffect(() => {
        getDogs();
    }, [dogData]);

    useEffect(() => {

    }, [favList]);

    const getDogs = async () => {
        const response = await getData('/dogs', 'POST', JSON.stringify(dogData.resultIds));

        if (response.ok) {
            const dogs = await response.json();
            setDogList(dogs);
        }
    }

    const toggleSort = (e: React.MouseEvent) => {
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

    const favorite = (e: React.MouseEvent) => {
        const element = e.target as HTMLElement;
        if (element.parentElement?.id) {
            setFavList([...favList, element.parentElement?.id]);
        }
    };

    const unfavorite = (e: React.MouseEvent) => {
        const element = e.target as HTMLElement;
        if (element.parentElement?.id) {
            const copyFavList = [...favList];
            const index = favList.indexOf(element.parentElement.id);
            copyFavList.splice(index, 1);
            setFavList(copyFavList);
        }
    };

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell id="fav-col-header"><div className="table-header-wrapper">{favList.length ? <Favorite /> : <FavoriteBorder />}</div></TableCell>
                    <TableCell id="img-col-header">Image</TableCell>
                    <TableCell id="name-col-header">Name</TableCell>
                    <TableCell align="center">Age</TableCell>
                    <TableCell id="zip-col-header" align="center">Zip Code</TableCell>
                    <TableCell id="breed-col-header" onClick={toggleSort}>
                        <div className="table-header-wrapper">
                            Breed {sort.breed === 'ASC' ? <ArrowUpward /> : <ArrowDownward />}
                        </div>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {dogList.map((dog) => {
                    console.log(dog.id);
                    console.log(favList);
                    console.log('THIS DOG', dog.id, dog.id in favList);
                    return (
                        <TableRow key={dog.id}>
                            <TableCell id={dog.id} className="fav-cell">
                                {dog.id in favList ?
                                    <Favorite className="fav" onClick={unfavorite} /> :
                                    <FavoriteBorder className="fav-border" onClick={favorite} />}
                            </TableCell>
                            <TableCell className="img-cell"><a target="_blank" href={dog.img}><img className="dog-img" src={dog.img} /></a></TableCell>
                            <TableCell>{dog.name}</TableCell>
                            <TableCell align="center">{dog.age}</TableCell>
                            <TableCell align="center">{dog.zip_code}</TableCell>
                            <TableCell>{dog.breed}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    );
};