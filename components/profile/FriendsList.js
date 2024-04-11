import styled from 'styled-components'
import {useCurrentUser, useUserFriends, useUserIsLoggedIn} from "@/hooks/user.hook";
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
        <Container>
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

const Container = styled.div`
  min-width: 450px; 
  height: 300px;
  padding: 24px;
  border-radius: 12px;
  background-color: ${theme.WHITE};



`


const EmptyContainer = styled(FlexBox)`
  height: 100%;
  
  .empty-title {
    font-size: 20px
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
