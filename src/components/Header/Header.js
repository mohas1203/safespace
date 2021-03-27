import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase'
import GuestHeader from './GuestHeader/GuestHeader';
import AuthHeader from './AuthHeader/AuthHeader'


export default function Header() {

    const [user] = useAuthState(auth)

    return (
        user ? <AuthHeader /> : <GuestHeader />
    )
}
