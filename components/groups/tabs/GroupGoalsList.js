import React from 'react';
import styled from "styled-components";
import {FlexBox} from "@/components/core";
import {useParams, useRouter} from "next/navigation";

function GroupGoalsList({list = []}) {
    const {groupId} = useParams();
    const router = useRouter()
    const handleClick = (groupId, goalId) => () => {
        router.push(`/group/${groupId}/goal/${goalId}`)
    }
    return (
        <Container direction={'column'}  gap={6} align={'flex-start'}>
            {list.map(goal => {
                return (
                    <GoalItem onClick={handleClick(groupId, goal.id)}  align={'flex-start'} direction={'column'} key={goal.id}>
                        <h3> {goal.name}</h3>
                        <p>{goal.description}</p>

                    </GoalItem>
                )
            })
            }
        </Container>
    );
}

export default GroupGoalsList;

const Container = styled(FlexBox)`
  width: 100%;
  margin: 12px;
`

const GoalItem = styled(FlexBox)`
  padding: 12px;
  width: 100%;
    
    &:hover {
        cursor: pointer;
      background-color: #f5f5f5;
        //transform: scale(1.1);
    }
`

