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
            <FlexBox className={'top-section'} justify={'center'} gap={50}  align={'flex-start'}>
                <FriendsList />
                <UserActivityStats />
            </FlexBox>
            <UserActivityGraph />

            <Gap gap={24}/>

            {/*<FlexBox justify={'center'} gap={200}  align={'flex-start'}>*/}
            {/*    <FriendsList />*/}
                <UserHistoryTable />
            {/*</FlexBox>*/}
        </Container>
    )
}


export default UserActivity;

const Container = styled.div`
    .top-section {
      margin: 24px;
    }
  
`

const ActionContainer = styled(FlexBox)`
  margin: 24px 0px;
  
`
