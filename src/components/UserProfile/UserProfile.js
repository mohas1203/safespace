import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from "../../firebase"
import "./UserProfile.css"


export default function UserProfile() {
    const [user] = useAuthState(auth)
    const [firstname, setFirstname] = useState('')
    const [profilepic, setProfilepic] = useState('')
    const [posts, setPosts] = useState([])
    // const [title, setTitle] = useState([])
    // const [body, setBody] = useState([])


    
    if (user){
        db.collection("users").doc(user.uid).get().then((snapshot) =>{
            setFirstname(snapshot.data().firstname)
            setProfilepic(snapshot.data().photoURL)
        })
    }

    useEffect(()=> {
        db.collection("posts").where("post_id", "==", user.uid).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setPosts(prev => [...prev, doc.data()])

            })
        }).then(() => {
            console.log(posts)
        })
    }, [])

    const detailedPostView = () => {
        console.log("Detailed View")
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
                <Grid item xs={6}>
                    <div className="user-post-card-section">
                            {posts.map( (post, index) => {
                                return (

                                    <Card className="user-post-card" onClick={detailedPostView}>
                                        <CardHeader avatar={<Avatar alt={firstname} src={profilepic}/>}
                                        action={
                                            <IconButton aria-label="settings">
                                                <DeleteTwoToneIcon />
                                            </IconButton>
                                            }
                                        title={post.title}
                                        />
                                        <CardContent>
                                            <Typography>{post.body}</Typography>
                                        </CardContent>
                                    </Card>

                                )
                            })}
                        </div>
                </Grid>
            </Grid>
        </div>
    )
}
