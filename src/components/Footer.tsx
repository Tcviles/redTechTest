import React from 'react'
import Box from '@mui/material/Box'
import { tss } from 'tss-react'
import { Typography } from '@mui/material'

const useStyles = tss.create({
    footer: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'black',
        minHeight: '70px',
        borderRadius: '5px',
        boxShadow: '0px 2px 92px 0px rgba(0, 0, 0, 0.20) !important',
        WebkitBoxShadow: '0px 2px 92px 0px rgba(0, 0, 0, 0.20) !important',
        MozBoxShadow: '0px 2px 92px 0px rgba(0, 0, 0, 0.20) !important'
    },
    footerText: {
        color: '#9c9c9c',
        padding: '20px 25px'
    },
    textLeft: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: 'white'
    },
    textRight: {
        fontSize: '13px'
    },
    link: {
        textDecoration: 'none',
        color: 'white'
    }
})

function Footer() {
    const { classes } = useStyles()

    return (
        <Box className={classes.footer}>
            <Box className={classes.footerText}>
                <Typography className={classes.textLeft}>Thomas Viles</Typography>
            </Box>

            <Box className={classes.footerText}>
                <Typography className={classes.textRight}>@2024 All Rights Reserved </Typography>
                <Typography className={classes.textRight}>See the code! <a href='https://github.com/tcviles/redTechTest' className={classes.link} target='_blank' rel='noreferrer'>Github.com</a></Typography>
            </Box>
        </Box>
    )
}
export default Footer