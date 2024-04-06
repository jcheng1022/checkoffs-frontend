'use client'

import styled from "styled-components";
import {FlexBox, Gap} from "@/components/core";
import UserHistoryTable from "@/components/profile/UserHistory"
import UserActivityGraph from "@/components/profile/UserActivityGraph";


const UserActivity = () => {
    return (
        <Container>

            <UserActivityGraph />

            <Gap gap={24}/>

            <UserHistoryTable />
        </Container>
    )
}


export default UserActivity;

const Container = styled.div``

const ActionContainer = styled(FlexBox)`
  margin: 24px 0px;
  
`
