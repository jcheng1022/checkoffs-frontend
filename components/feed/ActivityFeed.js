'use client'

import styled from 'styled-components'
import {useActivityFeed} from "@/hooks/activity.hook";
import {FlexBox} from "@/components/core";
import ActivityList from "@/components/feed/ActivityList";
import {useCurrentUser} from "@/hooks/user.hook";
import LoadingFeed from "@/components/skeletons/LoadingFeed";

const ActivityFeed = () => {
    const {data: user } = useCurrentUser();
    const {data: feed, isFetching, isLoading} = useActivityFeed(user?.id)
    return (
        <Container justify={'center'}>
            {(isFetching || isLoading) ?
                <LoadingFeed/> :
                <ActivityList list={feed}/>
            }
        </Container>
    )
}


export default ActivityFeed;

const Container = styled(FlexBox)`
  width: 100%;
  
  
  //background-color: red;
`

