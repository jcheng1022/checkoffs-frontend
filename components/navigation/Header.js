'use client'

import {Button, Dropdown} from "antd";
// import {googleAuthProvider} from "@/app/firebase";
import {FlexBox} from "@/components/core";
import {useAuthContext} from "@/context/AuthContext";
import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import styled from 'styled-components'
import {useCurrentUser, useUserIsLoggedIn} from "@/hooks/user.hook";
import {Menu, X} from "react-feather";
import {theme} from '@/styles/themes'
import {useAppContext} from "@/context/AppContext";
import HamburgerMenu from "@/components/navigation/MobileMenu";
import NotificationsList from "@/components/NotificationsList";

const Header = () => {
    const { data: user, isFetching, isLoading,  } = useCurrentUser();
    const fetchingUser = isFetching || isLoading;
    const userUid = useUserIsLoggedIn()

    const { setOpenUserSettings } = useAppContext();
    const [openMenu, setOpenMenu] = useState(false)

    const {logOut, handleSignIn } = useAuthContext()
    const router = useRouter();
    const pathname = usePathname()
    const {creatingNewActivity, setCreatingNewActivity} = useAppContext();

    let isMobile = window?.matchMedia("(max-width: 600px)")?.matches;





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
            key: 'settings',
            label: (
                <div onClick={() => setOpenUserSettings(true)}>
                    Settings
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
        onClick: () => setOpenMenu(prev => !prev)
    }

    const endSection = () => {
        console.log(userUid, user, fetchingUser, 'checking')
        if (userUid && !user && fetchingUser) {
            return <div>Loading...</div>
        }
        if (!userUid && !user) {
            return <Button className={'sign-in-btn'} onClick={() => handleSignIn()}>
                Sign in
            </Button>
        }
        if (userUid && user && !fetchingUser) {
            return <Dropdown
                trigger={['hover']}
                className={'header-user-dropdown'}
                menu={{
                    items
                }}
            >
                <div className={'username'}  > {user?.username ? user.username : user?.name ? user.name : 'No name yet!'} </div>
            </Dropdown>
        }
    }
    return (
        <>
            <Container justify={'space-between'}>
                <FlexBox justify={'flex-start'} gap={18} wrap={'no-wrap'}>

                    {openMenu ? <X className={'menu-icon close-mobile-menu'} {...menuProps} /> :
                        <Menu className={'menu-icon open-mobile-menu'} {...menuProps} />
                    }
                    {/*{isMobile && (*/}
                    {/*    mobileMenuIsOpen ? <X className={'menu-icon close-mobile-menu'} {...menuProps} /> : <Menu className={'menu-icon open-mobile-menu'} {...menuProps} />*/}
                    {/*)}*/}
                    <div className={'app-name'}  onClick={handleRouterPush(`/`)}>Checkoff</div>

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


                    { !!user && <NotificationsList  />}
                    {endSection()}


                    {/*{*/}
                    {/*    (!!userSignedIn && (fetchingUser && !user)) ?*/}
                    {/*    <div>Loading...</div> :*/}
                    {/*    (!!user) ?*/}

                    {/*        <Dropdown*/}
                    {/*            trigger={['hover']}*/}
                    {/*            className={'header-user-dropdown'}*/}
                    {/*            menu={{*/}
                    {/*                items*/}
                    {/*            }}*/}
                    {/*        >*/}
                    {/*            <div className={'username'}  > {user?.username ? user.username : user?.name ? user.name : 'No name yet!'} </div>*/}
                    {/*        </Dropdown>*/}



                    {/*        : ( !!user) ?*/}
                    {/*            <Button className={'new-btn'}  onClick={() => setCreatingNewActivity(true)}> New </Button>*/}
                    {/*            :*/}

                    {/*            (*/}
                    {/*                <Button className={'sign-in-btn'} onClick={() => handleSignIn()}>*/}
                    {/*                    Sign in*/}
                    {/*                </Button>*/}

                    {/*        )*/}
                    {/*}*/}
                </FlexBox>

            </Container>
            <HamburgerMenu open={openMenu} closeMenu={() => setOpenMenu(false)} />
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
    margin: 0px 6px;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    color: ${theme.darkBlue_1};
    letter-spacing: 1.1px;
  }
  
  .menu-icon {
    margin: 8px;
    cursor: pointer;
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
  
  .sign-in-btn {
    background-color: ${theme.lightBlue_2};
    color: white;
    font-weight: 600;
    height: 36px;
  }
  
  .ant-dropdown-menu-item {
    min-width: 500px;
  }
  
  
`
