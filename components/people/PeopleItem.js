import styled from "styled-components";
import {UserPlus} from "react-feather";
import {FlexBox} from "@/components/core";
import {useState} from "react";
import {notification, Spin} from "antd";
import APIClient from '@/services/api'
import {useQueryClient} from "@tanstack/react-query";
import {useCurrentUser} from "@/hooks/user.hook";
import {theme} from "@/styles/themes";

const PeopleItem = ({user}) => {

    const [isLoading, setIsLoading] = useState(false)
    const client = useQueryClient();
    const { data: self} = useCurrentUser()

    const handleAddFriend = async () => {


        setIsLoading(true)

        await APIClient.api.post(`/user/friends`, {
            friendId: user.id
        }).then(() => {
            client.refetchQueries({queryKey: ['currentUser', { withFriends: true}]})
            notification.success({
                description: 'Friend request sent'
            })

        }).catch(e =>  notification.error({
            description: e.message || 'Could not send friend request'
        })).finally(() => {

            setIsLoading(false)
        })

    }

    return (
        <Spin spinning={isLoading}>
        <Container >

               <div className={'username'}>
                   {user.username}
               </div>

               <FlexBox justify={'flex-end'} gap={8}>
                   {!user?.isFriend && (user?.id !== self.id) &&  (
                       <UserPlus className={'action'} onClick={handleAddFriend}/>
                   )}
               </FlexBox>
        </Container>
        </Spin>
    )
}

export default PeopleItem;

const Container = styled(FlexBox)`
    width: 100%;
    //width: 90%;
    margin: 12px 0px;
    padding: 12px;
    height: 50px;
  background-color: ${theme.WHITE};
  border-radius: 8px;
  
  .username{
    font-size: 14px;
    padding: 0px 8px;
  }
  
  .action {
    cursor: pointer;
  }
`
