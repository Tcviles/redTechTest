import { ReactElement, useEffect, useState } from 'react'
import { Button, Checkbox, CircularProgress, Grid, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { tss } from 'tss-react'
import { useDispatch, useSelector } from 'react-redux'
import { OrderType, OrderTypeEnum, StateType } from '../utils/types'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { syncOrders } from '../reducers/OrderReducer'
import { useDeleteOrdersOnDiscMutation, useGetOrdersQuery } from '../reducers/apiReducer'

const useStyles = tss.create({
    table: {
        background: 'white',
    },
    banner: {
        background: 'Red',
        color: 'white',
        fontSize: '24px',
        textAlign: 'center',
        position: 'sticky',

        '@media (min-width: 400px)': {
            display: 'none',
        },
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
    },
    editCell: {
        '@media (max-width: 500px)': {
            display: 'none',
        },
    },
    intrusiveEditCell: {
        '@media (min-width: 500px)': {
            display: 'none',
        },
    },
    rowHoverEffect: {
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#f0f0f0',
        },
    },
})

const HeaderButton = ({ label, icon, onClick, classes, datacy } : {
    label: string
    icon: ReactElement
    onClick: () => void
    classes: Record<string, string>
    datacy: string
}) => (
    <Grid item xs={12} sm={3} className={classes.headerItem}>
        <Button 
            data-cy={datacy} 
            className={classes.button} 
            variant="contained" 
            onClick={onClick}
        >
            {icon} {label}
        </Button>
    </Grid>
);

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
    const [isLoading2, setIsLoading2] = useState<boolean>(false)

    useEffect(() => {
        refetch()
    }, [])

    useEffect(() => {
        if (data && !isLoading && !isError) {
            dispatch(syncOrders(data))
        }
    }, [data, dispatch])

    const handleCheckboxChange = (orderId: string) => {
        if (selectedOrders.includes(orderId)) {
            setSelectedOrders(selectedOrders.filter(id => id !== orderId))
        } else {
            setSelectedOrders([...selectedOrders, orderId])
        }
    }

    const handleDeleteOrders = async () => {
        setIsLoading2(true)
        await deleteOrdersOnDisc(selectedOrders)
            .then(() => { refetch() })
            .finally(() => setIsLoading2(false))
    }

    const filteredOrders = orders.filter(order =>
        (order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.createdByUserName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.orderType.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchQuery.toLowerCase()))

        &&
        (orderTypeFilter === 'All Types' || order.orderType === orderTypeFilter)
    )

    if (isLoading2) {
        return (
            <Grid container justifyContent={"center"}>
                <CircularProgress />
            </Grid>
        )
    }

    return (
        <div>
            <Grid className={classes.table}>
                <Grid className={classes.banner}>Get A bigger phone dawg</Grid>
                <Grid container className={classes.tableHeader}>
                    <HeaderButton
                        datacy='create-order-btn'
                        label='Create Order'
                        icon={<AddIcon />}
                        onClick={() => navigate("/create")}
                        classes={classes}
                    />
                    <HeaderButton
                        datacy='delete-selected-btn'
                        label='Delete Selected'
                        icon={<DeleteIcon />}
                        onClick={handleDeleteOrders}
                        classes={classes}
                    />
                    <Grid item xs={6} sm={3} className={classes.headerItem}>
                        <TextField
                            data-cy='search-fld'
                            label="Search"
                            variant="outlined"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3} className={classes.headerItem}>
                        <Select
                            data-cy='type-fltr'
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
                            <TableCell className={classes.editCell}></TableCell>
                            <TableCell>Order ID</TableCell>
                            <TableCell className={classes.combinedCell}>Created By</TableCell>
                            <TableCell className={classes.separatedCell}>Creation Date</TableCell>
                            <TableCell className={classes.separatedCell}>Created By</TableCell>
                            <TableCell className={classes.combinedCell}>Customer / Order Type</TableCell>
                            <TableCell className={classes.separatedCell}>Order Type</TableCell>
                            <TableCell className={classes.separatedCell}>Customer</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders.map((order: OrderType, index: number) => (
                            <TableRow key={index} className={classes.rowHoverEffect}>
                                <TableCell className={classes.editCell}>
                                    <Checkbox
                                        data-cy={`edit-chbx-${order.orderId}`}
                                        checked={selectedOrders.includes(order.orderId)}
                                        onChange={() => handleCheckboxChange(order.orderId)}
                                    />
                                </TableCell>
                                <TableCell className={classes.intrusiveEditCell}>
                                    <Checkbox
                                        data-cy={`edit-chbx-${order.orderId}`}
                                        checked={selectedOrders.includes(order.orderId)}
                                        onChange={() => handleCheckboxChange(order.orderId)}
                                    />
                                    <Typography>{order.orderId}</Typography>
                                </TableCell>
                                <TableCell className={classes.editCell}>{order.orderId}</TableCell>
                                <TableCell className={classes.combinedCell}>
                                    <Typography>{order.createdByUserName}</Typography>
                                    <Typography variant='caption'>{order.createdDate}</Typography>
                                </TableCell>
                                <TableCell className={classes.separatedCell}>{order.createdDate}</TableCell>
                                <TableCell className={classes.separatedCell}>{order.createdByUserName}</TableCell>
                                <TableCell className={classes.combinedCell}>
                                    <Typography>{order.customerName}</Typography>
                                    <Typography variant='caption'>{order.orderType}</Typography>
                                    <Button className={classes.intrusiveEditCell} onClick={() => navigate(`/update/${order.orderId}`)}>
                                        <EditIcon />
                                    </Button>
                                </TableCell>
                                <TableCell className={classes.separatedCell}>{order.orderType}</TableCell>
                                <TableCell className={classes.separatedCell}>{order.customerName}</TableCell>
                                <TableCell className={classes.editCell}>
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
