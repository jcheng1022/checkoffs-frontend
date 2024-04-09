'use client'

import {Button, Dropdown, List} from "antd";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
// import {googleAuthProvider} from "@/app/firebase";
import {FlexBox} from "@/components/core";
import {useAuthContext} from "@/context/AuthContext";
import {auth} from "@/lib/firebase/firebase";
import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import NewActivityModal from "@/components/modals/NewActivityModal";
import styled from 'styled-components'
import {useQueryClient} from "@tanstack/react-query";
import {useCurrentUser, useUserFriends} from "@/hooks/user.hook";
import {Globe} from "react-feather";
import APIClient from '@/services/api'

const Header = () => {
    const { data: user } = useCurrentUser();

    const {logOut } = useAuthContext()
    const router = useRouter();
    const pathname = usePathname()
    const [creatingNewActivity, setCreatingNewActivity] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)
    const {data: pendingFriends} = useUserFriends(user?.id, 'PENDING')



    const client = useQueryClient();

    useEffect(() => {
        //  onAuthStateChanged(auth, async (user) => {
        //     console.log(pathname, 'sgsdsd PATH')
        //
        //     if (user && pathname.includes('/user')  ) {
        //         fetch("/api/auth", {
        //             method: "POST",
        //             headers: {
        //                 Authorization: `Bearer ${await user.getIdToken()}`,
        //             },
        //         }).then((response) => {
        //             // if (response.status === 200) {
        //             //     router.push("/user/1");
        //             // }
        //         });
        //
        //     }
        // });


    }, [auth, user]);


    const handleSignIn = async () => {
        const provider = new GoogleAuthProvider()
        console.log(`signing in`)
        // await setPersistence(auth, firebase.auth.Auth.Persistence.NONE);

        // await signInWithRedirect(auth, provider).then(user => {
        //
        //     return user.getIdToken().then(idToken => {
        //         // Session login endpoint is queried and the session cookie is set.
        //         // CSRF protection should be taken into account.
        //         // ...
        //         const csrfToken = getCookie('csrfToken')
        //         console.log(`should fetch now`)
        //         return fetch('/api/auth/login', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'CSRF-Token': csrfToken
        //             },
        //             body: JSON.stringify({idToken, csrfToken})
        //         });
        // })
        //
        // }).then(() => {
        //     window.location.assign('/profile');
        // });

        signInWithPopup(auth, provider)
            .then(async (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // const idToken = await user.getIdToken();

                // IdP data available using getAdditionalUserInfo(result)
                // ...
                //         const csrfToken = getCookie('csrfToken')
                // console.log(idToken, token, user, csrfToken, 'POPUP SHII')

                // return fetch('/api/auth/login', {
                //                 method: 'POST',
                //                 headers: {
                //                     // 'Content-Type': 'application/json',
                //                     'CSRF-Token': csrfToken
                //                 },
                //                 body: JSON.stringify({idToken: idToken, csrfToken})
                //             });

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
                <div className={'feature-link'} onClick={() =>  {
                    router.push(`/people`)}
                }> People </div>
            </FlexBox>
            <FlexBox justify={'flex-end'} gap={12}>
                { !!user && <Button  onClick={() => setCreatingNewActivity(true)}> New </Button>}


                <Globe color={'black'} size={20} onClick={() => setShowNotifications(prev => !prev)} />

                <div className={'notification-list'} style={{
                    display: showNotifications ? 'block' : 'none',
                    width: 400,
                    position: 'absolute',
                    top: 50,
                    right: 40,
                    zIndex: 100,
                    backgroundColor: 'white',
                    padding: 12,
                    borderRadius: 12,  }
                }>

                    {
                        pendingFriends?.length > 0 && (
                            <>
                                <div className={'notif-headers'}> Buddy Requests</div>
                                <List

                                    itemLayout="horizontal"
                                    dataSource={pendingFriends}
                                    renderItem={(item, index) => {

                                        const handleRespond = (response) => () => {
                                            return APIClient.api.patch(`/user/friends`, {
                                                requestId: item?.id,
                                                status: response,
                                            }).then(async () => {
                                                await client.refetchQueries({queryKey: ['friends', user?.id, 'PENDING']})
                                            })
                                        }
                                        return (
                                            <List.Item>
                                                <FlexBox>
                                                    <div style={{color: 'black'}} className={'buddy-name'}> {item?.username}</div>
                                                    {/*<div className={'buddy-email'}> {item?.friendEmail}</div>*/}
                                                </FlexBox>

                                                <FlexBox justify={'flex-end'} wrap={'no-wrap'} gap={6}>
                                                    <Button className={'invite-accept-btn'}
                                                            onClick={handleRespond('ACCEPTED')}
                                                            type={'primary'}>
                                                        Accept
                                                    </Button>
                                                    <Button
                                                        onClick={handleRespond('DECLINED')}
                                                    >
                                                        Decline
                                                    </Button>
                                                </FlexBox>

                                            </List.Item>
                                        )
                                    }}
                                />
                            </>
                        )
                    }
                    {/*<div className={'notif-headers'}> Notifications</div>*/}
                    {/* <Gap gap={12}/>*/}
                    {/*<FlexBox justify={'space-between'}>*/}
                    {/*    <div className={'notif-headers'}> Notifications</div>*/}
                    {/*    <Button>*/}
                    {/*        Mark all as read*/}
                    {/*    </Button>*/}
                    {/*</FlexBox>*/}
                    {/*<List*/}


                    {/*    // className="notification-list"*/}
                    {/*    itemLayout="horizontal"*/}
                    {/*    dataSource={notifications?.results}*/}
                    {/*    renderItem={(item, index) => {*/}
                    {/*        const handlePlanResponse = (response) => () => {*/}
                    {/*            return APIClient.api.patch(`/planner/plan/${item?.meta?.planId}/user`, {*/}
                    {/*                status: response,*/}
                    {/*                notificationId: item?.id*/}

                    {/*            }).then(async () => {*/}
                    {/*                await client.refetchQueries(['notifications', user?.id])*/}
                    {/*            })*/}
                    {/*        }*/}
                    {/*        return (*/}
                    {/*            <List.Item>*/}
                    {/*                <div className={'read-section'}>*/}
                    {/*                    {!item?.isRead ? <div className={'read-icon'} /> : null}*/}
                    {/*                </div>*/}
                    {/*                <FlexBox direction={'column'} align={'start'}>*/}
                    {/*                    <div className={'notification-message'}> {item?.message}</div>*/}
                    {/*                    <div className={'timestamp'}> {dayjs(item?.createdAt).format('MMMM Do YYYY h:ss a')} </div>*/}
                    {/*                    /!*<List.Item.Meta*!/*/}
                    {/*                    /!*    // avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}*!/*/}
                    {/*                    /!*    // title={<a href="https://ant.design">{item.title}</a>}*!/*/}
                    {/*                    /!*    description={item.message}*!/*/}

                                        {/*/>*/}
                    {/*                    {item?.type === 'friend-request' ? (*/}
                    {/*                        <FlexBox justify={'flex-end'} wrap={'no-wrap'} gap={6}>*/}
                    {/*                            <Button className={'invite-accept-btn'} type={'primary'}>*/}
                    {/*                                Accept*/}
                    {/*                            </Button>*/}
                    {/*                            <Button>*/}
                    {/*                                Decline*/}
                    {/*                            </Button>*/}
                    {/*                        </FlexBox>*/}
                    {/*                    ) : (item?.type === 'plan-invite' && item?.status === 'PENDING') ? (*/}
                    {/*                        <>*/}
                    {/*                            <Gap gap={8}/>*/}
                    {/*                            <FlexBox direction={'row'} gap={18}>*/}
                    {/*                                <Button onClick={handlePlanResponse('ACCEPTED')} type={'primary'}>*/}
                    {/*                                    Accept*/}
                    {/*                                </Button>*/}
                    {/*                                <Button onClick={handlePlanResponse('DECLINED')}>*/}
                    {/*                                    Decline*/}
                    {/*                                </Button>*/}
                    {/*                            </FlexBox>*/}
                    {/*                        </>*/}
                    {/*                    ) : null}*/}
                    {/*                </FlexBox>*/}
                    {/*            </List.Item>*/}
                    {/*        )*/}
                    {/*    }}*/}
                    {/*/>*/}
                </div>


                {
                    // initializingAuth ? <div> Loading... </div> :
                        user ?

                        <Dropdown
                            trigger={['hover']}

                            menu={{
                                items
                            }}
                        >
                            <div  > {user?.username ? user.username : user?.name ? user.name : 'No name yet!'} </div>
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
