'use client';

import React from 'react';
import styled from "styled-components";
import {useGroupGoals} from "@/hooks/groups.hook";
import {useParams} from "next/navigation";
import GroupGoalsList from "@/components/groups/tabs/GroupGoalsList";

function GroupGoals() {
    const {groupId} = useParams();
    const {data: goals} = useGroupGoals(groupId, {
        withFeed: false
    })
    return (
        <>
            <GroupGoalsList list={goals} />
        </>
    );
}

export default GroupGoals;

const Container = styled.div``
