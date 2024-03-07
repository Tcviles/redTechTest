import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { tss } from 'tss-react';
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../reducers/OrderReducer';
import { StateType, OrderType, OrderTypeEnum } from '../utils/types';
import { useNavigate } from 'react-router-dom';

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

function CreateOrder() {
    const { classes } = useStyles();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const orders = useSelector((state: StateType) => state.orders) as OrderType[]
    const [customer, setCustomer] = useState<string>('');
    const [orderType, setOrderType] = useState<OrderTypeEnum>(OrderTypeEnum.Standard);
    const [createdBy, setCreatedBy] = useState<string>('');

    const createOrderId = (): string => {
        const characters = '0123456789abcdef';
        const sectionsLengths = [8, 4, 4, 12];
        let orderId = '';

        sectionsLengths.forEach((sectionLength, index) => {
            for (let i = 0; i < sectionLength; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                orderId += characters[randomIndex];
            }
            if (index !== sectionsLengths.length - 1) {
                orderId += '-';
            }
        });

        const returnValue = orders.find(order => order.Id === orderId) ? createOrderId() : orderId

        return returnValue;
    }
    const handleCustomerChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCustomer(event.target.value);
    };

    const handleOrderTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setOrderType(event.target.value as OrderTypeEnum);
    };

    const handleCreatedByChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCreatedBy(event.target.value);
    };

    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        dispatch(
            addOrder({
                Id: createOrderId(),
                CustomerName: customer,
                Type: orderType,
                CreatedDate: Date.now(),
                CreatedByUsername: createdBy,
            })
        );

        navigate('/');
    };

    return (
        <Grid container justifyContent="center" className={classes.container}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Typography variant="h5">Create New Order</Typography>
                <TextField
                    label="Customer Name"
                    variant="outlined"
                    fullWidth
                    value={customer}
                    onChange={handleCustomerChange}
                    margin="normal"
                />
                <TextField
                    select
                    label="Order Type"
                    variant="outlined"
                    fullWidth
                    value={orderType}
                    onChange={handleOrderTypeChange}
                    margin="normal"
                >
                    {Object.values(OrderTypeEnum).map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Created By"
                    variant="outlined"
                    fullWidth
                    value={createdBy}
                    onChange={handleCreatedByChange}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                    Submit
                </Button>
            </form>
        </Grid>
    );
}

export default CreateOrder;