import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import { theme } from "../../theme"
import { ThemeProvider } from "@material-ui/core"
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import { db } from '../../firebase';
import "./Home.css"
const toxicity = require("@tensorflow-models/toxicity")

export default function Home() {

    const [comment, setComment] = useState('')
    const [posts, setPosts] = useState([])
    const [button, setButton] = useState(true)
    const [reply, setReply] = useState('')
    const threshold = 0.5;

    useEffect(() =>{
        db.collection("posts").get()
         .then((querySnapshot) =>{
             querySnapshot.forEach((doc) => {
                setPosts((prev) => [...prev, doc.data()])
             })
         })

    }, [])
    
    const handleCommentChange = (e) =>{
        setComment(e.target.value)
    }

    const handleAnalyzeClick= (e) => {
        toxicity.load(threshold).then(model =>{
            const sentence = [comment]

            model.classify(sentence).then((predictions) => {
                if (predictions[0].results[0].match === true || predictions[1].results[0].match === true || predictions[2].results[0].match === true || predictions[3].results[0].match === true || predictions[4].results[0].match === true || predictions[5].results[0].match === true || predictions[6].results[0].match === true){
                    console.log("Toxicty True")
                } else {
                    console.log("Not toxic")
                    setButton(false)
                }

            })
        })
    }


    return (
        <ThemeProvider theme={theme}>
        <div className="homepage-section">
            <Grid spacing={4} container> 
            {Object.keys(posts).map((post, i) => {
                return (
                    <Grid item xs={12}>
                        <Card className="homepage-card">
                            <CardHeader avatar={<Avatar alt="" src={posts[post].profile_pic}/>}
                                title={posts[post].title}
                            />
                            <CardContent>
                                <Typography>{posts[post].body}</Typography>
                                <br></br>
                                <br></br>
                                <TextField onChange={handleCommentChange} label="Send Message" className="post-comment-field"
                                      InputProps={{
                                        endAdornment: (
                                          <InputAdornment>
                                            <IconButton onClick={handleAnalyzeClick} color="secondary" >
                                              <SpellcheckIcon />
                                            </IconButton>
                                            <IconButton onClick={() =>{
                                                db.collection("posts").where("unique_id", "==", posts[post].unique_id).get()
                                                 .then((querySnapshot) =>{
                                                    querySnapshot.docs.forEach((doc) => {
                                                        let comments = doc.data().comments 
                                                        console.log(comments)
                                                        comments.push(comment)
                                                        doc.ref.update({
                                                            comments: comments
                                                        })
                                                        setReply("Comment Sent")
                                                    })
                                                 })
                                            }}
                                            color="secondary" disabled={button}>
                                              <SendIcon />
                                            </IconButton>
                                          </InputAdornment>
                                        )
                                      }}
                                />
                                <br></br>
                                <br></br>
                                <Typography style={{color: "green"}}>{reply}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )
            })}
            </Grid>
        </div>
        </ThemeProvider>
    )
}
