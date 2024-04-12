'use client';

import styled from 'styled-components'
import {FlexBox} from "@/components/core";
import {ColorPicker} from "antd";

const HomePage = () => {
    //
    // const [showLoader, setShowLoader] = useState(true);
    // const router = useRouter()


    // const {user} = useAuthContext();
    // const {data: user, isFetching, isLoading} = useCurrentUser();
    //
    // useEffect(() => {
    //     // After isFetching becomes false, wait for 3 seconds before hiding the loader
    //     if (!isFetching && !isLoading) {
    //         const timeout = setTimeout(() => {
    //             console.log(`calling?`)
    //             setShowLoader(false);
    //         }, 2000); // 3000 milliseconds = 3 seconds
    //
    //         return () => clearTimeout(timeout);
    //     }
    // }, [isFetching, isLoading]);
    //
    // useEffect(() => {
    //     console.log(user, 'user')
    //     if (user) {
    //         console.log(`push`)
    //         router.replace(`/user/${user.id}`)
    //         console.log(`hell`)
    //     }
    // }, [user])
    return (
            <Container direction={'column'} align={'center'} justify={'center'}>

                <div style={{margin: '24px 0px'}}>
                    [IGNORE THIS PAGE FOR NOW]
                </div>
                <div>
                     This is a placeholder for the home page. This page will be replaced with the actual home page.
                </div>

                <div style={{margin: '24px 0px'}}>
                    Get started by signing in with your google account
                </div>
                {/*<Spin spinning={isFetching || isLoading}>*/}
                {/*{!showLoader && !user && <NotLoggedIn />}*/}
                {/*{showLoader && <DotLoader color="#36D7B7" size={25} /> }*/}

                {/*{showLoader ? <DotLoader color="#36D7B7" size={25} /> : user ? <LoggedIn /> : <NotLoggedIn />}*/}
                {/*</Spin>*/}
            </Container>
    )
}


export default HomePage;

const Container = styled(FlexBox)`
  height: 500px;
`
