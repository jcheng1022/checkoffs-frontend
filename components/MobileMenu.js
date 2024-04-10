import styled from "styled-components";
import {useAppContext} from "@/context/AppContext";
import {theme} from "@/styles/themes";
import {useRouter} from "next/navigation";
import {useCurrentUser} from "@/hooks/user.hook";
import {useAuthContext} from "@/context/AuthContext";

const MobileMenu = () => {
    const { mobileMenuIsOpen, setMobileMenuIsOpen } = useAppContext()
    const { logOut, handleSignIn } = useAuthContext();
    const  router = useRouter()
    const { data: user } = useCurrentUser()
    console.log(mobileMenuIsOpen, '3232')
    let menuItems;

    if (user ) {
        menuItems = [
            {
                key: 'feed',
                label: 'Feed',
                onClick: () => {
                    router.push('/feed')
                    setMobileMenuIsOpen(false)
                }
            },
            {
                key: 'account',
                label: 'Account',
                onClick: () => {
                    router.push(`/user/${user?.id}`)
                    setMobileMenuIsOpen(false)

                }
            },
            {
                key: 'sign-out',
                label: 'Sign Out',
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
                        <div onClick={navItem.onClick} className={'mobile-nav-item'}>
                            {navItem.label}
                        </div>
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
    padding: 12px;
    
  }
  
`
