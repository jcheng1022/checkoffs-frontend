import styled from 'styled-components'
import {useUserFriends, useUserIsLoggedIn} from "@/hooks/user.hook";
import FriendItem from "@/components/profile/FriendItem";
import {theme} from "@/styles/themes";
import {Spin} from "antd";
import {FlexBox} from "@/components/core";
import {useParams} from 'next/navigation';
import EmptyContent from "@/components/EmptyContent";


const FriendsList = () => {
    const isLoggedIn = useUserIsLoggedIn();
    const { user:userId } = useParams();

    const {data: friends, isFetching, isLoading} = useUserFriends(isLoggedIn, 'ACCEPTED', {
        userId
    })


    return (
        <Container>
            {(isFetching || isLoading) ?
                <FlexBox style={{height: '100%'}} justify={'center'} align={'center'}>
                    <Spin tip={<div> Fetching your friends...</div>} />
            </FlexBox> :
                friends?.length === 0 ?
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

        </Container>
    )
}


export default FriendsList;

const Container = styled.div`
  flex: ${(props) => props.flex || 1};

  min-width: 300px;
  margin: 24px 24px;
  height: 300px;
  padding: 24px;
  border-radius: 12px;
  color: white;
  background-color: ${theme.jetGrey};

  @media only screen and (max-width: 600px) {
    min-width: 100%;
    width: 100%;
    
    

  }





`



