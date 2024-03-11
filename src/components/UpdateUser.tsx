import { Button, Grid, TextField, Typography } from '@mui/material'
import { tss } from 'tss-react'
import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../reducers/UserReducer'
import { useNavigate } from 'react-router-dom'
import { HistoryType, StateType } from '../utils/types'

const useStyles = tss.create({
    container: {
        background: 'white'
    },
    form: {
        margin: '20px',
    },
    button: {
        marginLeft: '10px',
    },
})

function Signin() {
    const { classes } = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [username, setUsername] = useState<string>('')
    const history = useSelector((state: StateType) => state.history) as HistoryType

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        dispatch(
            updateUser(username)
        )
        
        navigate(history.prevRoute)
    }

    return (
        <Grid container justifyContent="center" className={classes.container}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Typography variant="h5">Update User Name</Typography>
                <TextField
                    data-cy='username-fld'
                    label="New Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={handleUsernameChange}
                    margin="normal"
                />
                <Button data-cy='user-submit-btn' type="submit" variant="contained" color="primary" className={classes.button}>
                    Submit
                </Button>
            </form>
        </Grid>
    )
}

export default Signin
