import styled from "styled-components";
import {UserPlus} from "react-feather";
import {FlexBox} from "@/components/core";
import {useState} from "react";
import {notification, Spin} from "antd";
import APIClient from '@/services/api'
import {useQueryClient} from "@tanstack/react-query";

const PeopleItem = ({user}) => {

    const [isLoading, setIsLoading] = useState(false)
    const client = useQueryClient();

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

               {user.username}

               <FlexBox justify={'flex-end'} gap={8}>
                   {!user?.isFriend && (
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
    margin: 12px 12px;
    padding: 12px;
    height: 30px;
    border: 1px solid black;
  
  .action {
    cursor: pointer;
  }
`
