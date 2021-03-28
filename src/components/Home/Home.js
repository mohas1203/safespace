import React, { useState } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useAuthState } from "react-firebase-hooks/auth"
import { db, auth } from '../../firebase';

export default function Home() {

    const [user] = useAuthState(auth)
    const [post, setPost] = useState([])

    async function getAllPosts(){
        const snapshot = await db.collection('posts').get()
        return snapshot.docs.map(doc => doc.data())
    }

    setPost((prev) => [...prev, getAllPosts])

    return (
        <div>
            
        </div>
    )
}
