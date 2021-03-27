import React, { useState } from 'react'
import { Card, CardContent, Typography, TextField, Button } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/core" 
import  { Redirect } from 'react-router-dom'
import { theme } from "../../theme"
import { auth } from "../../firebase"
import './Login.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailChange = (e) =>{
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) =>{
        setPassword(e.target.value)
    }

    const loginOnClick = () =>{
        auth.signInWithEmailAndPassword(email, password).then(() =>{
            console.log("it worked")
            document.location.href = '/'
        }).catch((error) =>{
            console.log("There is an error " + error)
        })
    }

    return (
        <div className="login-card-section">
            <ThemeProvider theme={theme}>
                <Card className="login-card">
                    <CardContent>
                        <Typography variant="h2">Login</Typography>
                        <br></br>
                        <br></br>
                        <TextField label="Email" className="login-input-field" variant="outlined" onChange={handleEmailChange}/>
                        <br></br>
                        <br></br>
                        <br></br>
                        <TextField label="Password" type="password" className="login-input-field" variant="outlined" onChange={handlePasswordChange}/>
                        <br></br>
                        <br></br>
                        <Button color="secondary" variant="contained" onClick={loginOnClick}>Login</Button>
                    </CardContent>
                </Card>
            </ThemeProvider>
        </div>  
    )
}
