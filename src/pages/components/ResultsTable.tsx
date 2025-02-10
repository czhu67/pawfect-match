import { Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
};

export default function ResultsTable() {
    const [sort, setSort] = useState('ASC');
    const [visibleRows, setVisibleRows] = useState<Dog[]>([]);
    const [dogList, setDogList] = useState<Dog[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => setDogList([
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
        }, {
            id: '3',
            img: 'Lilo.img',
            name: 'Lilo',
            age: 4,
            zip_code: '23230',
            breed: 'Chihuahua'
        },
        {
            id: '4',
            img: 'Lily.img',
            name: 'Lily2',
            age: 8,
            zip_code: '75013',
            breed: 'Border Terrier'
        },
        {
            id: '5',
            img: 'Luna.img',
            name: 'Luna2',
            age: 13,
            zip_code: '75206',
            breed: 'Labrador Retriever'
        }, {
            id: '6',
            img: 'Lilo.img',
            name: 'Lilo2',
            age: 4,
            zip_code: '23230',
            breed: 'Chihuahua'
        }
    ]), []);
    useEffect(() => setVisibleRows(dogList.slice(0, rowsPerPage)), [dogList]);
    useEffect(() => {
        const reversedList = visibleRows.reverse();
        setVisibleRows(reversedList);
    }, [sort]);

    const toggleSort = () => {
        if (sort == 'ASC') {
            setSort('DSC');
        } else {
            setSort('ASC');
        }
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        setVisibleRows(dogList.slice(newPage * rowsPerPage, (newPage + 1) * rowsPerPage));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        setVisibleRows(dogList.slice(0, parseInt(event.target.value)));
    };


    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Age</TableCell>
                        <TableCell align="center">Zip Code</TableCell>
                        <TableCell onClick={toggleSort}>
                            <div style={{ display: "flex" }}>
                                Breed {sort == 'ASC' ? <ArrowUpward /> : <ArrowDownward />}
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {visibleRows.map((dog) => (
                        <TableRow key={dog.id}>
                            <TableCell>{dog.img}</TableCell>
                            <TableCell>{dog.name}</TableCell>
                            <TableCell align="center">{dog.age}</TableCell>
                            <TableCell align="center">{dog.zip_code}</TableCell>
                            <TableCell>{dog.breed}</TableCell>
                        </TableRow>
                    ))}
                    {visibleRows.length < rowsPerPage && dogList.length > rowsPerPage ?
                        <TableRow style={{
                            height: 53 * (rowsPerPage - visibleRows.length),
                        }} /> : null}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            count={dogList.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={[5, 10, 25, 50]}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};