'use client'

import {Button, Dropdown, Menu} from "antd";
import {FlexBox} from "@/components/core";
import {useAuthContext} from "@/context/AuthContext";
import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import styled from 'styled-components'
import {useCurrentUser, useUserIsLoggedIn} from "@/hooks/user.hook";
import {X, Menu as MenuIcon} from "react-feather";
import {theme} from '@/styles/themes'
import {useAppContext} from "@/context/AppContext";
import HamburgerMenu from "@/components/navigation/MobileMenu";
// Required CSS import, unless you're overriding the styling
import "@knocklabs/react/dist/index.css";
import KnockNotificationList from "@/components/KnockNotificationList";

const Header = () => {
    const { data: user, isFetching, isLoading,  } = useCurrentUser();
    const fetchingUser = isFetching || isLoading;
    const userUid = useUserIsLoggedIn()

    const { setOpenUserSettings } = useAppContext();
    const [openMenu, setOpenMenu] = useState(false)

    const {logOut, handleSignIn } = useAuthContext()
    const router = useRouter();
    const pathname = usePathname()
    const { setCreatingNewActivity} = useAppContext();






    const items = [
        {
            key: 'account',
            onClick: () => router.push(`/user/${user?.id}`),
            label: (
                // <div onClick={() => router.push(`/user/${user?.id}`)}>
                    'My Account'
                // </div>
            ),
        },
        {
            key: 'settings',
            onClick: () => setOpenUserSettings(true),
            label: (
                // <div onClick={() => setOpenUserSettings(true)}>
                    'Settings'
                // </div>
            ),
        },
        {
            key: 'sign-out',
            onClick: logOut,
            label: (

                // <div onClick={logOut} >
                    'Sign Out'
                // </div>

            ),
        }
    ]

    const handleRouterPush = (path) => () => {
        if (!path) return;
        router.push(path)
    }

    const menuProps = {
        color: 'white',
        onClick: () => setOpenMenu(prev => !prev)
    }

    const endSection = () => {
        if (userUid && !user && fetchingUser) {
            return <div>Loading...</div>
        }
        if (!userUid && !user) {
            return <Button className={'sign-in-btn'} onClick={() => handleSignIn()}>
                Sign in
            </Button>
        }
        if (userUid && user && !fetchingUser) {

            const menu = (
                <Menu
                    style={{
                        width: 200,
                        borderRadius: 'none',
                        backgroundColor: theme.jetGrey
                    }}
                >
                    {items.map((item, index) => {
                        return (
                            <Menu.Item
                                style={{
                                    color: theme.SNOW,
                                    fontSize: 18,
                                    width: 200
                                }}
                                className={'menu-item'} key={`acc-menu-${index}`} onClick={ item?.onClick} >
                                {item.label}
                            </Menu.Item>
                        )
                    })}
                </Menu>
            )
            return <Dropdown
                trigger={['click']}
                overlayClassName={'header-user-dropdown-overlay'}
                className={'header-user-dropdown'}
                overlay={menu}
                // menu={{
                //     items
                // }}
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
                        <MenuIcon className={'menu-icon open-mobile-menu'} {...menuProps} />
                    }


                    <div className={'app-name'}  onClick={handleRouterPush(`/`)}>Checkoffs</div>

                    { pathname !== '/feed' && !!user && (
                        <div className={`feature-link ${pathname === '/feed' && 'hide-link-on-mobile'} `} onClick={handleRouterPush('/feed')}>
                            Feed
                        </div>
                    )}

                    { pathname !== '/people' && (
                        <div className={`feature-link ${pathname === '/people' && 'hide-link-on-mobile'}`} onClick={handleRouterPush('/people')}>
                            People
                        </div>
                    )}
                </FlexBox>
                <FlexBox justify={'flex-end'} gap={18}>
                    { !!user &&  <Button className={'new-btn'}  onClick={() => setCreatingNewActivity(true)}> New </Button>}


                    { !!user?.firebaseUuid && <KnockNotificationList uuid={user?.firebaseUuid}  />}

                    {endSection()}


                </FlexBox>

            </Container>
            <HamburgerMenu open={openMenu} closeMenu={() => setOpenMenu(false)} />
        </>
    )
}

export default Header


const Container = styled(FlexBox)`
  width: 100%;
  height: 75px;
  // background-color: ${theme.WHITE};
  padding: 8px;
  margin: 0px;
  position: relative;

  .menu-container {
    background-color: ${theme.darkBlue} !important;]
  }
  .ant-dropdown {
    padding: 0px;
    background-color: red;
  }
 

  .hide-link-on-mobile {
    display: none;
  }

  .app-name {
    margin: 0px 6px;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    // color: ${theme.darkBlue_1};
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
    // color: ${theme.lightBlue_2};
  }
  
  .feature-link:hover {
    color: ${theme.softBlue_1};
  }

  
  .new-btn {
    background-color: ${theme.secondaryPink};
    color: white;
    font-weight: 600;
    width: 100px;
    margin: 0px 12px;
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
  
  @media only screen and (max-width: 600px) {
    .feature-link {
      display: none;
    }
    
    .new-btn {
        display: none;
    }
  }
  
  
`
