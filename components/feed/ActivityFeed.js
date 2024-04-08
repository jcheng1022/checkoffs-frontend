'use client'

import styled from 'styled-components'
import {useActivityFeed} from "@/hooks/activity.hook";
import {FlexBox} from "@/components/core";
import ActivityList from "@/components/feed/ActivityList";
import {useCurrentUser} from "@/hooks/user.hook";

const ActivityFeed = () => {
    const {data: user } = useCurrentUser();
    const {data: feed} = useActivityFeed(user?.id)
    return (
        <Container justify={'center'}>
            <ActivityList list={feed}/>
        </Container>
    )
}


export default ActivityFeed;

const Container = styled(FlexBox)`
  width: 100%;
  
  
  //background-color: red;
`

