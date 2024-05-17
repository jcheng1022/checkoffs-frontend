import React from 'react';
import styled from "styled-components";
import {Avatar, Modal} from "antd";
import {useGroupMembers} from "@/hooks/groups.hook";
import PeopleList from "@/components/people/PeopleList";
import {FlexBox} from "@/components/core";
import {theme} from "@/styles/themes";
import {useCurrentUser} from "@/hooks/user.hook";

function ViewGroupMembers({open, onClose, groupId}) {
    const {data: user} = useCurrentUser();
    const {data: members} = useGroupMembers(groupId)




    return (
        <StyledModal  footer={[]}  closeIcon={null} open={open} onClose={onClose}>
            {members?.filter(o => o.userId !== user?.id)?.map((member, index) => {
                const {user} = member

                    return (
                        <FlexBox gap={12}key={index} className={'goal-member'}>
                            <Avatar

                                className={'goal-user-avatar'}
                            >
                                {user.username[0].toUpperCase()}
                            </Avatar>
                            <span className={'goal-user-username'}> {user.username} </span>

                            <FlexBox justify={'flex-end'} >
                                <div className={'nudge-container'}>
                                    <span className={'nudge-text'}> Nudge </span>
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
