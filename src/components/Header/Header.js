import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useStyles, theme } from '../../theme'
import { ThemeProvider } from '@material-ui/core/styles';

export default function Header() {
    const classes = useStyles()

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Depressure
                    </Typography>
                    <Button color="inherit">Login</Button>
                    <Button color="inherit">Signup</Button>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}
