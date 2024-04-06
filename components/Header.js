'use client'

import {Button, Dropdown} from "antd";
import {GoogleAuthProvider, onAuthStateChanged, signInWithPopup} from "firebase/auth";
// import {googleAuthProvider} from "@/app/firebase";
import {FlexBox} from "@/components/core";
import {useAuthContext} from "@/context/AuthContext";
import {auth} from "@/lib/firebase/firebase";
import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import NewActivityModal from "@/components/modals/NewActivityModal";
import styled from 'styled-components'
import {MoreVertical} from "react-feather";
import {useQueryClient} from "@tanstack/react-query";

const Header = () => {
    const {user, initializingAuth, logOut } = useAuthContext()
    const router = useRouter();
    const pathname = usePathname()
    const [creatingNewActivity, setCreatingNewActivity] = useState(false)

    const client = useQueryClient();

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

    // const handleSignOut = () => {
    //     auth.signOut().then(() => {
    //         router.replace('/')
    //         // client.refetchQueries({queryKey: ['currentUser']})
    //     });
    // }
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

    const items = [
        {
            key: 'account',
            label: (
                <div onClick={() => router.push(`/user/${user?.id}`)}>
                    My Account
                </div>
            ),
        },
        {
            key: 'sign-out',
            label: (

                <div onClick={logOut} >
                    Sign Out
                </div>

            ),
        }
    ]



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
                    initializingAuth ? <div> Loading... </div> : user ?

                        <Dropdown
                            trigger={['hover']}

                            menu={{
                                items
                            }}
                        >
                            <div  > {user?.username ? user.username : user.name} </div>
                        </Dropdown>



                        : <Button onClick={handleSignIn}>
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
