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
                            {Object.keys(posts).map((post, i) =>{
                                return (
                                    <Card className="user-post-card" >
                                        <CardHeader avatar={<Avatar alt={firstname} src={profilepic}/>}
                                        action={
                                            <IconButton onClick={() =>{
                                                db.collection("posts").where("unique_id", "==", posts[post].unique_id).get()
                                                 .then((querySnapshot) =>{
                                                    querySnapshot.forEach((doc) => {
                                                        doc.ref.delete()
                                                        var current_post = posts
                                                        var x = posts.indexOf(posts[post])
                                                        current_post.splice(x, 1)
                                                        
                                                        setPosts((prev) => [...prev, current_post])
                                                    })
                                                 })
                                            }}>
                                                <DeleteTwoToneIcon />
                                            </IconButton>
                                            }
                                        title={posts[post].title == null ? "Deleted" : posts[post].title}
                                        />
                                        <CardContent>
                                            <Typography style={{cursor:"pointer"}} onClick={detailedPostView}>{posts[post].body}</Typography>
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
