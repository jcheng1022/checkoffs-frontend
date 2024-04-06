'use client'
import styled from "styled-components";
import {Button} from "antd";
import {GoogleAuthProvider, signInWithRedirect} from "firebase/auth";
import {auth} from "@/lib/firebase/firebase";

const NotLoggedIn = () => {
    const handleSignIn = () => {
        const provider = new GoogleAuthProvider()

        signInWithRedirect(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
            // Handle Errors here.

        })}
    return (
        <Container>
        <Button onClick={handleSignIn}>
            Sign in
        </Button>
        </Container>
    )
}

export default NotLoggedIn;

const Container = styled.div``
