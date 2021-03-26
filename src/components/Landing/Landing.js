import React from 'react'
import { Grid, Button } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/core"
import { theme } from "../../theme"
import './Landing.css'
import depressureImage from "./depressure.png"

export default function Landing() {
    return (
        <ThemeProvider theme={theme}>
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className="landing-section"
            >
                <Grid item xs={6}>
                    <div className="landing-text-section">
                        <h1 className="landing-title">Remove The <span id="depression">Depression</span></h1>
                        <h1 className="landing-subtitle">Using <span id="depressure">Depressure</span></h1>
                        <div className="button-section">
                            <Button color="primary" variant="contained" className="landing-button">Get Started</Button>
                            <div className="login-btn">
                                <Button color="secondary" variant="outlined" className="landing-button">Login</Button>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <img src={depressureImage} alt="Depressure" id="depressure-image"/>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}
