import React, { useState } from 'react'
import { Card, CardContent, Typography, TextField, Button } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/core" 
import { theme } from "../../theme"
import { auth, db } from "../../firebase"
import './Signup.css'

export default function Signup() {

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [photourl, setPhotourl] = useState('')


    const handleFirstnameChange = (e) =>{
        setFirstname(e.target.value)
    }

    const handleLastnameChange = (e) =>{
        setLastname(e.target.value)
    }

    const handleEmailChange = (e) =>{
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) =>{
        setPassword(e.target.value)
    }

    const handlePhotourlChange = (e) =>{
        setPhotourl(e.target.value)
    }

    const createAccount = (e) =>{
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            db.collection("users").doc(cred.user.uid).set({
                firstname: firstname,
                lastname: lastname,
                photoURL: photourl,
            }).then(() =>{
                console.log("User Created")
                // document.location.href = '/home'
            }).catch((error) =>{
                console.log(error)
            })
        })
    }

    return (
        <div className="login-card-section">
            <ThemeProvider theme={theme}>
                <Card className="login-card">
                    <CardContent>
                        <Typography variant="h2">Signup</Typography>
                        <br></br>
                        <br></br>
                        <TextField label="Firstname" variant="outlined"onChange={handleFirstnameChange}/>
                        <br></br>
                        <br></br>
                        <br></br>
                        <TextField label="Lastname" variant="outlined" onChange={handleLastnameChange}/>
                        <br></br>
                        <br></br>
                        <br></br>
                        <TextField label="Email" variant="outlined" onChange={handleEmailChange}/>
                        <br></br>
                        <br></br>
                        <br></br>
                        <TextField label="New Password" type="password" variant="outlined" onChange={handlePasswordChange}/>
                        <br></br>
                        <br></br>
                        <br></br>
                        <TextField label="Photo URL" variant="outlined"onChange={handlePhotourlChange}/>
                        <br></br>
                        <br></br>
                        <br></br>
                        <Button color="secondary" variant="contained" onClick={createAccount}>Create Account</Button>
                        <br></br>
                        <br></br>
                        <br></br>
                        <Typography id="warning">Please <b>ensure</b> that your password is <br></br> strong, or else data breaches may occur</Typography>
                    </CardContent>
                </Card>
            </ThemeProvider>
        </div>  
    )
}
