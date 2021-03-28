import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useAuthState } from "react-firebase-hooks/auth"
import { db, auth } from '../../firebase';
import "./Home.css"

export default function Home() {

    const [user] = useAuthState(auth)
    const [posts, setPosts] = useState([])

    useEffect(() =>{
        db.collection("posts").get()
         .then((querySnapshot) =>{
             querySnapshot.forEach((doc) => {
                setPosts((prev) => [...prev, doc.data()])
             })
         })
    }, [])
    

    return (
        <div className="homepage-section">
            <Grid spacing={1} container> 
            {Object.keys(posts).map((post, i) => {
                return (
                    <Grid item xs={6}>
                        <Card className="homepage-card">
                            <CardHeader avatar={<Avatar alt="" src={posts[post].profile_pic}/>}
                                title={posts[post].title}
                            />
                            <CardContent>
                                <Typography style={{cursor:"pointer"}} onClick={() => {
                                    document.location.href = '/postdetail' 
                                }}>{posts[post].body}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )
            })}
            </Grid>
        </div>
    )
}
