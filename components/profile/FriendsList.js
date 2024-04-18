import styled from 'styled-components'
import {useUserFriends, useUserIsLoggedIn} from "@/hooks/user.hook";
import FriendItem from "@/components/profile/FriendItem";
import {theme} from "@/styles/themes";
import {Spin} from "antd";
import {FlexBox} from "@/components/core";
import {useParams, useRouter} from 'next/navigation';


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


    const EmptyFriends = () => {
        return (
            <EmptyContainer direction={'column'} justify={'center'}>

                <div className={'empty-title'}> No Friends Yet!</div>
                <div className={'empty-desc'} onClick={() => {
                    router.push(`/people`)
                }
                }> Find people here</div>
            </EmptyContainer>
        )
    }
    return (
        <Container direction={'column'} align={'flex-start'} justify={'flex-start'} isMobile={isMobile} >
            <div> My Friends</div>

            {(isFetching || isLoading) ?
                <FlexBox style={{height: '100%'}} justify={'center'} align={'center'}>
                    <Spin tip={<div> Fetching your friends...</div>} />
            </FlexBox> :
                friends?.length === 0 ?
                    <EmptyFriends />
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
  //min-width: 300px; 
  min-width: ${props => props.isMobile ? '100%' : '300px'};
  //min-width: 100%;
  margin: 24px 24px;
  min-width: ${props => props.isMobile ? '100%' : '500px'};
  height: 300px;
  padding: 24px;
  border-radius: 12px;
  background-color: ${theme.WHITE};



`


const EmptyContainer = styled(FlexBox)`
  height: 100%;
  width: 100%;
  
  .empty-title {
    font-size: 20px;
  }

  .empty-desc {
    color: #1890ff;
    font-size: 14px;
    cursor: pointer;
  }

  .empty-desc:hover {
    text-decoration: underline;
  }
`
