'use client';

import React from 'react';
import styled from "styled-components";
import {useGroupGoals} from "@/hooks/groups.hook";
import {useParams} from "next/navigation";
import GroupGoalsList from "@/components/groups/tabs/GroupGoalsList";
import EmptyContent from "@/components/EmptyContent";

function GroupGoals() {
    const {groupId} = useParams();
    const {data: goals} = useGroupGoals(groupId, {
        withFeed: false
    })
    return (
        <>
            { goals?.length > 0 ?(
                <GroupGoalsList list={goals} />
            ) : (
                <EmptyContent title={'No goals found'} subtitle={'Looks like no goals have been created in this collection yet'}  />
            )}
        </>
    );
}

export default GroupGoals;

const Container = styled.div``
