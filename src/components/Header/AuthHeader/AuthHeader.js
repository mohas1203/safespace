import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { useStyles, theme } from '../../../theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { auth, db } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';


export default function AuthHeader() {
    const classes = useStyles()
    const [user] = useAuthState(auth)
    const [firstname, setFirstname] = useState('')
    const [profilePic, setProfilePic] = useState('')

    const handleSignout = () =>{
        auth.signOut().then(() => {
            console.log("User Signed Out")
        })
    }

    if (user){
        db.collection("users").doc(user.uid).get().then((snapshot) => {
            setProfilePic(snapshot.data().photoURL)
            setFirstname(snapshot.data().firstname)
        })
    }

    const handleProfileClick = () =>{
        document.location.href = '/profile'
    }

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                    <Link to="/home" style={{ textDecoration: 'none', color: "#fff", fontFamily:"Poppins" }}>SafeSpace.</Link>
                    </Typography>
                    <Button color="inherit"><Link to="/home" style={{ textDecoration: 'none', color: "#fff" }}>Home</Link></Button>
                    <Button color="inherit"><Link to="/createpost" style={{ textDecoration: 'none', color: "#fff" }}>Create Post</Link></Button>
                    <Button color="inherit" onClick={handleSignout}><Link to="/" style={{ textDecoration: 'none', color: "#fff" }}>Signout</Link></Button>
                    <Avatar style={{cursor:"pointer"}}alt={firstname} src={profilePic} onClick={handleProfileClick}/>
                </Toolbar>
            </AppBar>
        </ThemeProvider>

    )
}
