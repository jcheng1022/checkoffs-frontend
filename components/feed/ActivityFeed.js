'use client'

import styled from 'styled-components'
import {useActivityFeed} from "@/hooks/activity.hook";
import {FlexBox} from "@/components/core";
import ActivityList from "@/components/feed/ActivityList";
import {useCurrentUser} from "@/hooks/user.hook";
import LoadingFeed from "@/components/skeletons/LoadingFeed";
import {Empty} from "antd";

const ActivityFeed = () => {
    const {data: user } = useCurrentUser();
    const {data: feed, isFetching, isLoading} = useActivityFeed(user?.id)
    return (
        <Container justify={'center'} align={'center'}>
            {(isFetching || isLoading) ?
                <LoadingFeed/> :
                (feed?.length === 0 ) ?
                        <div style={{margin: '50px 0px'}}>
                            <Empty description={null} />
                            <div>
                                <h2>Nothing to see here... yet...</h2>
                                <p> Start posting to add to your feed or find some friends to see their activities here!</p>
                            </div>
                        </div>
                :
                <ActivityList list={feed}/>
            }
        </Container>
    )
}


export default ActivityFeed;

const Container = styled(FlexBox)`
  width: 100%;
  height: 100%;
  
  
  //background-color: red;
`

