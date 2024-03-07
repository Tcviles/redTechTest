import { useEffect, useState } from 'react'
import { Button, Checkbox, Grid, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { tss } from 'tss-react'
import { useDispatch, useSelector } from 'react-redux'
import { OrderType, OrderTypeEnum, StateType } from '../utils/types'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { syncOrders } from '../reducers/OrderReducer'
import { useDeleteOrdersOnDiscMutation, useGetOrdersByTypeQuery, useGetOrdersQuery } from '../reducers/apiReducer'

const useStyles = tss.create({
    table: {
        background: 'white',
    },
    tableHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: '10px',
        background: '#f0f0f0'
    },
    headerItem: {
        display: 'flex',
        justifyContent: 'center',
        padding: '10px',
    },
    button: {
        '@media (max-width: 800px)': {
            width: '100%',
        },
    },
    combinedCell: {
        '@media (min-width: 800px)': {
            display: 'none',
        },
    },
    separatedCell: {
        '@media (max-width: 800px)': {
            display: 'none',
        },
    }
})

function TVTable() {
    const { classes } = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const orders = useSelector((state: StateType) => state.orders)
    const [selectedOrders, setSelectedOrders] = useState<string[]>([])
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [orderTypeFilter, setOrderTypeFilter] = useState<string>('All Types')
    const { data, isLoading, isError, refetch } = useGetOrdersQuery()
    const [deleteOrdersOnDisc] = useDeleteOrdersOnDiscMutation()

    useEffect(() => {
        console.log("refetch on navigate")
        refetch()
    }, [])

    const handleCheckboxChange = (orderId: string) => {
        if (selectedOrders.includes(orderId)) {
            setSelectedOrders(selectedOrders.filter(id => id !== orderId))
        } else {
            setSelectedOrders([...selectedOrders, orderId])
        }
    }

    useEffect(() => {
        if (data && !isLoading && !isError) {
            dispatch(syncOrders(data)) 
        }
    }, [data, dispatch])

    const handleDeleteOrders = async () => {
        await deleteOrdersOnDisc(selectedOrders)
            .then(() => { refetch() })
    }

    const filteredOrders = orders.filter(order =>
        (order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.createdByUserName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()))

        &&
        (orderTypeFilter === 'All Types' || order.orderType === orderTypeFilter)
    )

    return (
        <div>
            <Grid className={classes.table}>
                <Grid container className={classes.tableHeader}>
                    <Grid item xs={12} sm={3} className={classes.headerItem}>
                        <Button className={classes.button} variant="contained" onClick={() => navigate("/create")}>
                            <AddIcon /> Create Order
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={3} className={classes.headerItem}>
                        <Button className={classes.button} variant="contained" onClick={handleDeleteOrders}>
                            <DeleteIcon /> Delete Selected
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm={3} className={classes.headerItem}>
                        <TextField
                            label="Search"
                            variant="outlined"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3} className={classes.headerItem}>
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
                    </Grid>
                    
                    
                    
                    
                </Grid>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Order ID</TableCell>
                            <TableCell className={classes.combinedCell}>Created By</TableCell>
                            <TableCell className={classes.separatedCell}>Creation Date</TableCell>
                            <TableCell className={classes.separatedCell}>Created By</TableCell>
                            <TableCell>Order Type</TableCell>
                            <TableCell>Customer</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders.map((order: OrderType, index: number) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedOrders.includes(order.orderId)}
                                        onChange={() => handleCheckboxChange(order.orderId)}
                                    />
                                </TableCell>
                                <TableCell>{order.orderId}</TableCell>
                                <TableCell className={classes.combinedCell}>
                                    <Typography>{order.createdByUserName}</Typography>
                                    <Typography variant='caption'>{order.createdDate}</Typography>
                                </TableCell>
                                <TableCell className={classes.separatedCell}>{order.createdDate}</TableCell>
                                <TableCell className={classes.separatedCell}>{order.createdByUserName}</TableCell>
                                <TableCell>{order.orderType}</TableCell>
                                <TableCell>{order.customerName}</TableCell>
                                <TableCell>
                                    <Button onClick={() => navigate(`/update/${order.orderId}`)}>
                                        <EditIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
        </div>
    )
}

export default TVTable
