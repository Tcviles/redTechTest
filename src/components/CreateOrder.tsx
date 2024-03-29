import { Button, CircularProgress, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { tss } from 'tss-react'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrder } from '../reducers/OrderReducer'
import { StateType, OrderType, OrderTypeEnum, UserType } from '../utils/types'
import { useNavigate } from 'react-router-dom'
import { usePostOrderMutation } from '../reducers/apiReducer'
import { setHistory } from '../reducers/HistoryReducer'
import { updateSavedDraft } from '../reducers/UserReducer'

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
})

function CreateOrder() {
    const { classes } = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state: StateType) => state.user) as UserType
    const [customer, setCustomer] = useState<string>(user.savedDraft.customerName)
    const [orderType, setOrderType] = useState<OrderTypeEnum>(user.savedDraft.orderType)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postOrder] = usePostOrderMutation()

    const handleCustomerChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCustomer(event.target.value)
    }

    const handleOrderTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setOrderType(event.target.value as OrderTypeEnum)
    }

    const handleSaveDraft = () => {
        dispatch(updateSavedDraft({ customerName: customer, orderType }))
    }

    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        const payload = {
            orderId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            orderType,
            customerName: customer,
            createdDate: new Date(Date.now()).toLocaleDateString(),
            createdByUserName: user.name,
        }
        await postOrder(payload)
            .unwrap()
            .then((result: OrderType)=> {
                dispatch(addOrder(result))
                dispatch(updateSavedDraft({ customerName: '', orderType: OrderTypeEnum.standard }))
                navigate('/')
            })
            .catch((e: any) => {
                console.error(e.body)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        if(user.name === "Guest") {
            dispatch(setHistory('/create'))
            navigate("/signin")
        }
    }, [])

    if (isLoading) {
        return (
            <Grid container justifyContent={"center"}>
                <CircularProgress />
            </Grid>
        )
    }

    return (
        <Grid container justifyContent="center" className={classes.container}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Typography variant="h5">Create New Order</Typography>
                <TextField
                    data-cy='customer-fld'
                    label="Customer Name"
                    variant="outlined"
                    fullWidth
                    value={customer}
                    onChange={handleCustomerChange}
                    margin="normal"
                />
                <TextField
                    select
                    data-cy='order-type-select'
                    label="Order Type"
                    variant="outlined"
                    fullWidth
                    value={orderType}
                    onChange={handleOrderTypeChange}
                    margin="normal"
                >
                    {Object.values(OrderTypeEnum).map((type) => (
                        <MenuItem 
                            data-cy={`value-${type}`} 
                            key={type} 
                            value={type}
                        >
                            {type}
                        </MenuItem>
                    ))}
                </TextField>
                <Button
                    data-cy='order-submit-btn'
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    Submit
                </Button>
                <Button
                    data-cy='save-draft-btn'
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleSaveDraft}
                >
                    Save Draft
                </Button>
            </form>
        </Grid>
    )
}

export default CreateOrder