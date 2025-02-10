import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
};

export default function ResultsTable() {
    const [sort, setSort] = useState('asc');
    const [visibleRows, setVisibleRows] = useState<Dog[]>([]);
    const [allDogs, setAllDogs] = useState<Dog[]>([]);

    useEffect(() => setVisibleRows(allDogs), [allDogs]);
    useEffect(() => setAllDogs([
        {
            id: '1',
            img: 'Lily.img',
            name: 'Lily',
            age: 8,
            zip_code: '75013',
            breed: 'Border Terrier'
        },
        {
            id: '2',
            img: 'Luna.img',
            name: 'Luna',
            age: 13,
            zip_code: '75206',
            breed: 'Labrador Retriever'
        },{
            id: '3',
            img: 'Lilo.img',
            name: 'Lilo',
            age: 4,
            zip_code: '23230',
            breed: 'Chihuahua'
        }
    ]), []);

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Age</TableCell>
                        <TableCell align="center">Zip Code</TableCell>
                        <TableCell>Breed</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {visibleRows.map((dog) => (
                        <TableRow>
                            <TableCell>{dog.img}</TableCell>
                            <TableCell>{dog.name}</TableCell>
                            <TableCell align="center">{dog.age}</TableCell>
                            <TableCell align="center">{dog.zip_code}</TableCell>
                            <TableCell>{dog.breed}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};