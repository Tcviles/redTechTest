import { Button, Grid, TextField, Typography } from '@mui/material'
import { tss } from 'tss-react'
import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateUser } from '../reducers/UserReducer'
import { useNavigate } from 'react-router-dom'

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
    const previousRoute = window.history.state
    console.log(previousRoute)

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        dispatch(
            updateUser(username)
        )

        navigate('/')
    }

    return (
        <Grid container justifyContent="center" className={classes.container}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Typography variant="h5">Update User Name</Typography>
                <TextField
                    label="New Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={handleUsernameChange}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                    Submit
                </Button>
            </form>
        </Grid>
    )
}

export default Signin
