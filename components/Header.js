'use client'

import {Button, Dropdown, List} from "antd";
// import {googleAuthProvider} from "@/app/firebase";
import {FlexBox} from "@/components/core";
import {useAuthContext} from "@/context/AuthContext";
import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import NewActivityModal from "@/components/modals/NewActivityModal";
import styled from 'styled-components'
import {useQueryClient} from "@tanstack/react-query";
import {useCurrentUser, useUserFriends} from "@/hooks/user.hook";
import {Globe, Menu, X} from "react-feather";
import APIClient from '@/services/api'
import {theme} from '@/styles/themes'
import {useAppContext} from "@/context/AppContext";
import MobileMenu from "@/components/MobileMenu";

const Header = () => {
    const { data: user } = useCurrentUser();

    const { mobileMenuIsOpen, setMobileMenuIsOpen, handleSignIn } = useAppContext();
    const {logOut } = useAuthContext()
    const router = useRouter();
    const pathname = usePathname()
    const [creatingNewActivity, setCreatingNewActivity] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)
    const {data: pendingFriends} = useUserFriends(user?.id, 'PENDING')

    let isMobile = false;

    if (window) {
         isMobile = window.matchMedia("(max-width: 600px)").matches;

    }

    const client = useQueryClient();

    useEffect(() => {
        setShowNotifications(false)

    }, []);





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

    const handleRouterPush = (path) => () => {
        if (!path) return;
        router.push(path)
    }

    const menuProps = {
        color: 'black',
        className: 'menu-icon',
        onClick: () => setMobileMenuIsOpen(prev => !prev)
    }

    return (
        <>
            <Container justify={'space-between'}>
                <FlexBox justify={'flex-start'} gap={18}>

                    {isMobile && (
                        mobileMenuIsOpen ? <X {...menuProps} /> : <Menu {...menuProps} />
                    )}
                    <div className={'app-name'}  onClick={handleRouterPush(`/`)}>GymFriends</div>

                    {!isMobile && pathname !== '/feed' && !!user && (
                        <div className={'feature-link'} onClick={handleRouterPush('/feed')}>
                            Feed
                        </div>
                    )}

                    {!isMobile && pathname !== '/people' && (
                        <div className={'feature-link'} onClick={handleRouterPush('/people')}>
                            People
                        </div>
                    )}
                </FlexBox>
                <FlexBox justify={'flex-end'} gap={18}>
                    { !!user && !isMobile && <Button className={'new-btn'}  onClick={() => setCreatingNewActivity(true)}> New </Button>}


                    <Globe className={'notification'} color={'black'} size={20} onClick={() => setShowNotifications(prev => !prev)} />

                    <div className={'notification-list'} style={{
                        display: showNotifications ? 'block' : 'none',
                        width: 400,
                        position: 'absolute',
                        top: 50,
                        right: isMobile ? 0 : 40,
                        zIndex: 100,
                        backgroundColor: 'white',
                        padding: 12,
                        borderRadius: 12,  }
                    }>

                        {
                            pendingFriends?.length > 0 ? (
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
                            ) : (
                                <div className={'no-notifications'}>
                                    No Notifications
                                </div>
                            )
                        }

                    </div>


                    {
                        (!isMobile && user) ?

                            <Dropdown
                                trigger={['hover']}

                                menu={{
                                    items
                                }}
                            >
                                <div className={'username'}  > {user?.username ? user.username : user?.name ? user.name : 'No name yet!'} </div>
                            </Dropdown>



                            : (!isMobile && !user) ? <Button onClick={handleSignIn}>
                                Sign in
                            </Button> : (
                                <Button className={'new-btn'}  onClick={() => setCreatingNewActivity(true)}> New </Button>

                            )
                    }
                </FlexBox>

                {!!creatingNewActivity && <NewActivityModal open={creatingNewActivity} onCancel={() => setCreatingNewActivity(false)}/> }
            </Container>
            <MobileMenu />
        </>
    )
}

export default Header


const Container = styled(FlexBox)`
  width: 100%;
  background-color: ${theme.WHITE};
  padding: 8px;
  margin: 0px;
  .app-name {
    font-size: 20px;
    //font-weight: 600;
    cursor: pointer;
    color: ${theme.darkBlue_1};
    letter-spacing: 1.1px;
  }
  
  .menu-icon {
    margin: 8px;
  }
  
  // .app-name:hover {
  //   color: ${theme.lightBlue_1};
  // }
  
  .feature-link {
    font-size: 16px;
    cursor: pointer;
    //height: 100%;
    color: ${theme.lightBlue_2};
  }
  
  .feature-link:hover {
    color: ${theme.softBlue_1};
  }
  
  .new-btn {
    background-color: ${theme.lightBlue_2};
    color: white;
    font-weight: 600;
    height: 36px;
  }
  
  .notification {
    cursor: pointer;
  }
  
  .username {
    cursor: pointer;
    letter-spacing: 1.01px;
  }
  
  
  .no-notifications {
    height: 100px;
    width: 200px;
  }
`
