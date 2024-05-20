import React from 'react';
import styled from "styled-components";
import {Avatar, Modal} from "antd";
import {useGroupMembers} from "@/hooks/groups.hook";
import {FlexBox} from "@/components/core";
import {theme} from "@/styles/themes";
import {useCurrentUser} from "@/hooks/user.hook";
import {useParams} from "next/navigation";
import APIClient from "@/services/api";
import {useAppContext} from "@/context/AppContext";
import {X} from "react-feather";

function ViewGroupMembers({open, onClose, groupId}) {
    const {data: user} = useCurrentUser();
    const {data: members} = useGroupMembers(!!user, groupId)
    const {goalId} = useParams()
    const {messageNotification} = useAppContext()

    const handleNudge = (userId) => () => {
        const key = `nudge-${userId}`

        messageNotification({
            key,
            type: 'loading',
            content: 'Loading...',
        });

        return APIClient.api.post(`/activity/${userId}/nudge`, {
        goalId}).then(() => {
            messageNotification({
                key,
                type: 'success',
                content: 'Nudged!',
                duration: 2,
            });
        }).catch(e => {
            console.log(`Error nudging user`, e)
            messageNotification({
                key,
                type: 'error',
                content: e.message || 'Error nudging user',
                duration: 2,
            });
        })
    }


    return (
        <StyledModal  footer={[]} closeIcon={<X/>} open={open} onCancel={onClose}>

            <div className={'text-2xl mb-5'} > Group Members </div>
            {members?.filter(o => o.userId !== user?.id)?.map((member, index) => {
                const {user} = member

                    return (
                        <FlexBox gap={12}key={index} className={'hover:border-b-4 rounded-md p-4 border-blue-50'}>
                            <Avatar

                                className={'goal-user-avatar'}
                            >
                                {user.username[0].toUpperCase()}
                            </Avatar>
                            <span className={'goal-user-username'}> {user.username} </span>

                            <FlexBox justify={'flex-end'} >
                                <div className={'nudge-container'} onClick={handleNudge(user.id)}>
                                    <span className={'font-extrabold'}> Nudge </span>
                                </div>
                            </FlexBox>
                        </FlexBox>
                    )
                })
            }

        </StyledModal>
    );
}

export default ViewGroupMembers;


const StyledModal = styled(Modal)`
  
  
  .nudge-container {
    background-color: ${theme.primaryBlue};
    padding: 4px 12px;
    
  }
  .nudge-container:hover {
    cursor: pointer;
    color: white;
  }
  
  .nudge-text {
    font-weight: 600;
  }
  .ant-modal-content {
    border-radius: 16px;
    
  }
  
  .ant-modal-body {
    padding: 24px 12px;
    height: 300px;
  }
  .goal-user-username {
    font-size: 1rem;
    font-weight: 500;
  }
  
  .goal-user-avatar {
    background-color: #000;
    color:#f0f0f0;
  }
`
