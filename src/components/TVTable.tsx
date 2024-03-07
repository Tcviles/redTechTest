import { useState } from 'react';
import { Button, Checkbox, Grid, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { tss } from 'tss-react';
import { useDispatch, useSelector } from 'react-redux';
import { OrderType, OrderTypeEnum, StateType } from '../utils/types';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteOrders } from '../reducers/OrderReducer';

const useStyles = tss.create({
    table: {
        background: 'white',
    },
    tableHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        background: '#f0f0f0'
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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orders = useSelector((state: StateType) => state.orders);
    const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [orderTypeFilter, setOrderTypeFilter] = useState<string>('All Types');

    const handleCheckboxChange = (orderId: string) => {
        if (selectedOrders.includes(orderId)) {
            setSelectedOrders(selectedOrders.filter(id => id !== orderId));
        } else {
            setSelectedOrders([...selectedOrders, orderId]);
        }
    };

    const handleDeleteOrders = () => {
        dispatch(deleteOrders(selectedOrders));
    };

    const filteredOrders = orders.filter(order =>
        (order.Id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.CreatedByUsername.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.Type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.CustomerName.toLowerCase().includes(searchQuery.toLowerCase()))

        &&
        (orderTypeFilter === 'All Types' || order.Type === orderTypeFilter)
    );

    return (
        <div>
            <Grid className={classes.table}>
                <Grid className={classes.tableHeader}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    
                    <Button variant="contained" onClick={() => navigate("/create")}>
                        <AddIcon /> Create 
                    </Button>
                    
                    <Select
                        value={orderTypeFilter}
                        onChange={(e) => setOrderTypeFilter(e.target.value as string)}
                        variant="outlined"
                    >
                        <MenuItem value="All Types">All Types</MenuItem>
                        {Object.values(OrderTypeEnum).map((type) => (
                            <MenuItem key={type} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </Select>
                    <Button variant="contained" onClick={handleDeleteOrders}>
                        <DeleteIcon /> Delete Selected Orders
                    </Button>
                </Grid>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Creation Date</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Order Type</TableCell>
                            <TableCell>Customer</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders.map((order: OrderType, index: number) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedOrders.includes(order.Id)}
                                        onChange={() => handleCheckboxChange(order.Id)}
                                    />
                                </TableCell>
                                <TableCell>{order.Id}</TableCell>
                                <TableCell>{new Date(order.CreatedDate).toLocaleDateString()}</TableCell>
                                <TableCell>{order.CreatedByUsername}</TableCell>
                                <TableCell>{order.Type}</TableCell>
                                <TableCell>{order.CustomerName}</TableCell>
                                <TableCell>
                                    <Button onClick={() => navigate(`/update/${order.Id}`)}>
                                        <EditIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
        </div>
    );
}

export default TVTable;
