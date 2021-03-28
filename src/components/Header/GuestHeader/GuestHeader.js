import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useStyles, theme } from '../../../theme'
import { ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

export default function GuestHeader() {
    const classes = useStyles()


    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                    <Link to="/" style={{ textDecoration: 'none', color: "#fff", fontFamily:"Poppins" }}>SafeSpace.</Link>
                    </Typography>
                    <Button color="inherit"><Link to="/login" style={{ textDecoration: 'none', color: "#fff" }}>Login</Link></Button>
                    <Button color="inherit"><Link to="/signup" style={{ textDecoration: 'none', color: "#fff" }}>Signup</Link></Button>
                </Toolbar>
            </AppBar>
        </ThemeProvider>

    )
}
