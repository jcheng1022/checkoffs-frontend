import styled from 'styled-components'
import {useUserFriends, useUserIsLoggedIn} from "@/hooks/user.hook";
import FriendItem from "@/components/profile/FriendItem";
import {theme} from "@/styles/themes";
import {Spin} from "antd";
import {FlexBox} from "@/components/core";
import {useParams, useRouter} from 'next/navigation';
import EmptyContent from "@/components/EmptyContent";


const FriendsList = () => {
    // const { data: user } = useCurrentUser();
    const isLoggedIn = useUserIsLoggedIn();
    const { user:userId } = useParams();

    const {data: friends, isFetching, isLoading} = useUserFriends(isLoggedIn, 'ACCEPTED', {
        userId
    })
    const router = useRouter();

    let isMobile = false;

    if (window) {
        isMobile = window.matchMedia("(max-width: 600px)").matches;

    }



    return (
        <Container direction={'column'} align={'flex-start'} justify={'flex-start'} isMobile={isMobile} >
            {(isFetching || isLoading) ?
                <FlexBox style={{height: '100%'}} justify={'center'} align={'center'}>
                    <Spin tip={<div> Fetching your friends...</div>} />
            </FlexBox> :
                friends?.length > 0 ?
                    <EmptyContent title={'No Friends...yet!'} subtitle={'Find people'} route={'/people'} />
                    :
                <>
                    {friends?.map((friend, index) => {
                        return (
                            <FriendItem key={index} friend={friend} />
                        )
                    })}
                </>
            }

           {/*<Spin spinning={isFetching || isLoading} tip={'Fetching your friends'}>*/}
           {/*    {friends?.map((friend, index) => {*/}
           {/*        return (*/}
           {/*            <FriendItem key={index} friend={friend} />*/}
           {/*        )*/}
           {/*    })}*/}
           {/*</Spin>*/}
        </Container>
    )
}


export default FriendsList;

const Container = styled(FlexBox)`
  min-width: ${props => props.isMobile ? '100%' : '300px'};
  margin: 24px 24px;
  height: 300px;
  padding: 24px;
  border-radius: 12px;
  background-color: ${theme.WHITE};



`



