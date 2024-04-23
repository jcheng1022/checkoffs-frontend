import styled from "styled-components";
import {useAppContext} from "@/context/AppContext";
import {theme} from "@/styles/themes";
import {useRouter} from "next/navigation";
import {useCurrentUser} from "@/hooks/user.hook";
import {useAuthContext} from "@/context/AuthContext";
import {Activity, BarChart, LogOut, Settings, Users} from "react-feather";
import {FlexBox} from "@/components/core";
import {useEffect} from "react";

const MobileMenu = () => {
    const { mobileMenuIsOpen, setMobileMenuIsOpen, setOpenUserSettings } = useAppContext()
    const { logOut, handleSignIn } = useAuthContext();
    const  router = useRouter()
    const { data: user } = useCurrentUser()
    let menuItems;



    const iconProps = {
        size: 16,
        style: {
            marginRight: 12
        }
    }

    if (user ) {
        menuItems = [
            {
                key: 'feed',
                icon: <Activity  {...iconProps }/>,
                label: 'Feed',
                onClick: () => {
                    router.push('/feed')
                    setMobileMenuIsOpen(false)
                }
            },
            {
                key: 'people',
                label: 'Find People',
                icon: <Users {...iconProps} />,
                onClick: () => {
                    router.push('/people')
                    setMobileMenuIsOpen(false)
                }
            },
            {
                key: 'account',
                label: 'Profile',
                icon: <BarChart {...iconProps} />,
                onClick: () => {
                    router.push(`/user/${user?.id}`)
                    setMobileMenuIsOpen(false)

                }
            },
            {
                key: 'settings',
                label: 'Settings',
                icon: <Settings {...iconProps} />,
                onClick: () => {
                     setOpenUserSettings(true)

                }
            },
            {
                key: 'sign-out',
                label: 'Sign Out',
                icon: <LogOut {...iconProps} />,
                onClick: () => {
                    logOut()
                    setMobileMenuIsOpen(false)
                }
            },
        ]
    } else {
        menuItems = [
            {
                key: 'sign-in',
                label: 'Sign In',
                onClick: () => {
                    handleSignIn();
                    setMobileMenuIsOpen(false)
                }
            }
        ]
    }

    if (!mobileMenuIsOpen || !menuItems) return null;


    return (
        <Container>

            {
                menuItems.map((navItem, index) => {
                    return (
                        <FlexBox key={`mobile-nav-item-${index}`} onClick={navItem.onClick} className={'mobile-nav-item'}>
                            {navItem.icon}
                            <div>
                                {navItem.label}
                            </div>
                        </FlexBox>
                    )
                })
            }
        </Container>
    )
}


export default MobileMenu;

const Container = styled.div`

  background-color: ${theme.WHITE};
  position: absolute;
  top: 50px;
  right: 0;
  z-index: 1000; /* Adjust z-index as needed */
  width: 100%;
  padding: 12px;

  .mobile-nav-item {
    padding: 8px 12px;
    cursor: pointer;
    
  }
  
`
