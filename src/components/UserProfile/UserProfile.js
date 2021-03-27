import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from "../../firebase"
import "./UserProfile.css"


export default function UserProfile() {
    const [user] = useAuthState(auth)
    const [firstname, setFirstname] = useState('')

    if (user){
        db.collection("users").doc(user.uid).get().then((snapshot) =>{
            setFirstname(snapshot.data().firstname)
        })
    }

    return (
        <div>
            <Grid spacing={3} container>
                <Grid item xs={6}>
                    <Card className="user-profile-card">
                        <CardContent>
                            <Typography variant="h3">Welcome back, {firstname}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}
