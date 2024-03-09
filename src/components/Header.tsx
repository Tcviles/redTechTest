
import { Button, Grid, Typography } from '@mui/material'
import { tss } from 'tss-react'
import { useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useDispatch, useSelector } from 'react-redux'
import { StateType } from '../utils/types'
import { setHistory } from '../reducers/HistoryReducer'

const useStyles = tss.create({
    tableHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        background: '#FFF'
    },
    logo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '64px',
        margin: '5px'
    },
    accountIcon: {
        transform: 'scale(1.5)'
    },
    account: {
        display: 'flex',
        alignItems: 'center'
    }
})

function Header() {
    const { classes } = useStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state: StateType) => state.user)
    
    return (
        <Grid className={classes.tableHeader}>
            <Grid>
                <Button onClick={() => navigate("/")}>
                    <img className={classes.logo} src={require('../media/red-tech-logo.png')} alt='' />
                </Button>
            </Grid>
            <Grid className={classes.account}>
                <Typography>Hello {user.name}</Typography>
                <Button className={classes.logo} onClick={() => {
                    dispatch(setHistory('/'))
                    navigate("/signin")
                }}>
                    <AccountCircleIcon className={classes.accountIcon} />
                </Button>
            </Grid>
        </Grid>
    )
}

export default Header
