import styled from 'styled-components'
import {useCurrentUser, useUserFriends} from "@/hooks/user.hook";
import FriendItem from "@/components/profile/FriendItem";

const FriendsList = () => {
    const { data: user } = useCurrentUser();
    const {data: friends} = useUserFriends(user?.id, 'ACCEPTED')
    return (
        <Container>
            <div> My Friends</div>

            {friends?.map((friend, index) => {
                return (
                    <FriendItem key={index} friend={friend} />
                )
            })}
        </Container>
    )
}


export default FriendsList;

const Container = styled.div`
  min-width: 450px; 



`
