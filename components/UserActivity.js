'use client'

import styled from "styled-components";
import {FlexBox, Gap} from "@/components/core";
import UserHistoryTable from "@/components/profile/UserHistory"
import UserActivityGraph from "@/components/profile/UserActivityGraph";
import UserActivityStats from "@/components/profile/UserActivityStats";
import FriendsList from "@/components/profile/FriendsList";


const UserActivity = () => {
    return (
        <Container>
            <UserActivityStats />
            <UserActivityGraph />

            <Gap gap={24}/>

            <FlexBox justify={'space-between'} align={'flex-start'}>
                <FriendsList />
                <UserHistoryTable />
            </FlexBox>
        </Container>
    )
}


export default UserActivity;

const Container = styled.div`
  
`

const ActionContainer = styled(FlexBox)`
  margin: 24px 0px;
  
`
