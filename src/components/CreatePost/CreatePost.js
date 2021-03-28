import React, { useState, useEffect } from 'react'
import { ThemeProvider } from "@material-ui/core"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField"
import { auth } from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { theme } from "../../theme"
import "./CreatePost.css"
import { db } from '../../firebase';

export default function CreatePost() {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [user] = useAuthState(auth)
    const [profilepic, setProfilepic] = useState('')
    const [comments, getComments]= useState([])

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleBodyChange = (e) => {
        setBody(e.target.value)
    }

    useEffect(() =>{
        db.collection("users").doc(user.uid).get().then((snapshot) => {
            setProfilepic(snapshot.data().photoURL)
        })
    }, [])

    const createPost = () => {

        db.collection("posts").add({
            profile_pic: profilepic,
            post_id: user.uid,
            title: title,
            body: body,
            unique_id: Math.random(),
            comments: [],
        }).then(()=>{
            console.log("Document successfully written!")
            document.location.href = '/home'
        }).catch((error)=>{
            console.log(error)
        })
    }

    return (
        <div className="create-post-section">
            <ThemeProvider theme={theme}>
                <Card className="create-post-card">
                    <CardContent>
                        <Typography variant="h3">Create Post</Typography>
                        <br></br>
                        <TextField onChange={handleTitleChange} label="Title" id="title-textfield"/>
                        <br></br>
                        <br></br>
                        <br></br>
                        <TextField onChange={handleBodyChange} label="Body" id="body-textfield" variant="outlined" rows={12} multiline/>
                        <br></br>
                        <br></br>
                        <Button onClick={createPost} id="post-button" color="secondary" variant="contained">Post</Button>
                    </CardContent>
                </Card>
            </ThemeProvider>
        </div>
    )
}
