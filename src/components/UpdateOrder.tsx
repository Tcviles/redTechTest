import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { tss } from 'tss-react';
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrder } from '../reducers/OrderReducer';
import { StateType, OrderType, OrderTypeEnum } from '../utils/types';
import { useNavigate, useParams } from 'react-router-dom';
import { usePutOrderMutation } from '../reducers/apiReducer';

const useStyles = tss.create({
    container: {
        background: 'white',
    },
    form: {
        margin: '20px',
    },
    button: {
        marginLeft: '10px',
    },
});

function UpdateOrder() {
    const { classes } = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orders = useSelector((state: StateType) => state.orders) as OrderType[];
    const [customer, setCustomer] = useState<string>('');
    const [orderType, setOrderType] = useState<OrderTypeEnum>(OrderTypeEnum.Standard);
    const { orderId } = useParams()
    const [putOrder] = usePutOrderMutation()

    // Assuming initialOrderData is obtained from the store or API
    const initialOrderData = orders.find(order => order.orderId === orderId);
    const [existingOrder, setExistingOrder] = useState<OrderType | null>(initialOrderData || null);

    const handleCustomerChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCustomer(event.target.value);
    };

    const handleOrderTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setOrderType(event.target.value as OrderTypeEnum);
    };

    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!existingOrder) return;
        const payload = {
            orderId: existingOrder.orderId,
            customerName: customer || existingOrder.customerName,
            orderType: orderType || existingOrder.orderType,
            createdDate: existingOrder.createdDate,
            createdByUserName: existingOrder.createdByUserName,
        }
        console.log(payload)
        await putOrder(payload)
        .then(() =>
            dispatch(updateOrder(payload))
        )

        navigate('/');
    };

    return (
        <Grid container justifyContent="center" className={classes.container}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Typography variant="h5">Update Order</Typography>
                <TextField
                    label="Customer Name"
                    variant="outlined"
                    fullWidth
                    value={customer || existingOrder?.customerName || ''}
                    onChange={handleCustomerChange}
                    margin="normal"
                />
                <TextField
                    select
                    label="Order Type"
                    variant="outlined"
                    fullWidth
                    value={orderType || existingOrder?.orderType || OrderTypeEnum.Standard}
                    onChange={handleOrderTypeChange}
                    margin="normal"
                >
                    {Object.values(OrderTypeEnum).map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </TextField>
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                    Update
                </Button>
            </form>
        </Grid>
    );
}

export default UpdateOrder;
