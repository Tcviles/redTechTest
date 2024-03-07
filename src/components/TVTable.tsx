
import { Button, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { tss } from 'tss-react';
import { useSelector } from 'react-redux';
import { OrderType, StateType } from '../utils/types'
import { useNavigate } from 'react-router-dom';

const useStyles = tss.create({
    table: {
        background: 'white',
    },
    tableHeader: {
        display: 'flex',
    },
    logo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '64px',
        margin: '5px'
    },
    button: {}
})

function TVTable() {
    const { classes } = useStyles();
    const navigate = useNavigate()
    const orders = useSelector((state: StateType) => state.orders);

    return (
        <div>
            <Grid className={classes.table}>
                <Grid className={classes.tableHeader}>
                    <Typography> Crud App for red-tech</Typography>
                    <Button onClick={() => navigate("/create")}> Create + </Button>
                </Grid>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Creation Date</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Order Type</TableCell>
                            <TableCell>Customer</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order: OrderType, index: number) => (
                            <TableRow key={index}>
                                <TableCell>{order.Id}</TableCell>
                                <TableCell>{order.CreatedDate}</TableCell>
                                <TableCell>{order.CreatedByUsername}</TableCell>
                                <TableCell>{order.Type}</TableCell>
                                <TableCell>{order.CustomerName}</TableCell>
                                <TableCell><Button>Edit</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
        </div>
    );
}

export default TVTable;
