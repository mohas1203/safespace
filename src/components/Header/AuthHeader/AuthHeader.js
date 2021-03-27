import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useStyles, theme } from '../../../theme'
import { ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

export default function AuthHeader() {
    const classes = useStyles()

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                    <Link to="/" style={{ textDecoration: 'none', color: "#fff" }}>Depressure</Link>
                    </Typography>
                    <Button color="inherit"><Link to="/home" style={{ textDecoration: 'none', color: "#fff" }}>Home</Link></Button>
                    <Button color="inherit"><Link to="/createpost" style={{ textDecoration: 'none', color: "#fff" }}>Create Post</Link></Button>
                    <Button color="inherit"><Link to="/" style={{ textDecoration: 'none', color: "#fff" }}>Signout</Link></Button>
                </Toolbar>
            </AppBar>
        </ThemeProvider>

    )
}
