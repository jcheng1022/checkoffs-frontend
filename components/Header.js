'use client'

import {Button} from "antd";
import {GoogleAuthProvider, onAuthStateChanged, signInWithPopup} from "firebase/auth";
// import {googleAuthProvider} from "@/app/firebase";
import {FlexBox} from "@/components/core";
import {useAuthContext} from "@/context/AuthContext";
import {auth} from "@/lib/firebase/firebase";
import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import NewActivityModal from "@/components/modals/NewActivityModal";
import styled from 'styled-components'

const Header = () => {
    const {user, initializingAuth } = useAuthContext()
    const router = useRouter();
    const pathname = usePathname()
    const [creatingNewActivity, setCreatingNewActivity] = useState(false)



    useEffect(() => {
         onAuthStateChanged(auth, async (user) => {
            console.log(pathname, 'sgsdsd PATH')
            if (user && pathname.includes('/user')  ) {

                fetch("/api/auth", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${await user.getIdToken()}`,
                    },
                }).then((response) => {
                    // if (response.status === 200) {
                    //     router.push("/user/1");
                    // }
                });

            }
        });


    }, [auth]);
    const handleSignIn = () => {
        const provider = new GoogleAuthProvider()

        signInWithPopup(auth, provider)
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
        <Container justify={'space-between'}>
            <FlexBox justify={'flex-start'} gap={18}>
                <div className={'app-name'}  onClick={() =>  {
                    router.push(`/`)}}>GymFriends</div>
                {pathname !== '/feed' && !!user && (
                    <div className={'feature-link'} onClick={() =>  {
                        router.push(`/feed`)}
                    }> Feed </div>
                )}
            </FlexBox>
            <FlexBox justify={'flex-end'} gap={12}>
                { !!user && <Button  onClick={() => setCreatingNewActivity(true)}> New </Button>}



                {
                    initializingAuth ? <div> Loading... </div> : user ? <div onClick={() =>  {
                        router.push(`/user/${user?.id}`)}
                    }> {user.name} </div> : <Button onClick={handleSignIn}>
                        Sign in
                    </Button>
                }
            </FlexBox>
            {!!creatingNewActivity && <NewActivityModal open={creatingNewActivity} onCancel={() => setCreatingNewActivity(false)}/> }

        </Container>
    )
}

export default Header


const Container = styled(FlexBox)`
  .app-name {
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
  }
  
  .feature-link {
    font-size: 16px;
    cursor: pointer;
  }
`
