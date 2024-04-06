'use client';

import styled from 'styled-components'

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
            <Container>

                home page
                {/*<Spin spinning={isFetching || isLoading}>*/}
                {/*{!showLoader && !user && <NotLoggedIn />}*/}
                {/*{showLoader && <DotLoader color="#36D7B7" size={25} /> }*/}

                {/*{showLoader ? <DotLoader color="#36D7B7" size={25} /> : user ? <LoggedIn /> : <NotLoggedIn />}*/}
                {/*</Spin>*/}
            </Container>
    )
}


export default HomePage;

const Container = styled.div``
