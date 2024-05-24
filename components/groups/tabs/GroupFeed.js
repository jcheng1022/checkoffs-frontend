import ActivityList from "@/components/feed/ActivityList";
import {useGroupFeed} from "@/hooks/groups.hook";
import {useParams} from "next/navigation";
import styled from "styled-components";
import {FlexBox} from "@/components/core";
import {useUserIsLoggedIn} from "@/hooks/user.hook";
import EmptyContent from "@/components/EmptyContent";

const GroupFeed = () => {
    const {groupId} = useParams()
    const isLoggedIn = useUserIsLoggedIn()
    const {data: feed } = useGroupFeed(isLoggedIn, groupId);
    return (
        <Container justify={'center'} align={'center'}>

            { feed?.length > 0 ?(
                <ActivityList list={feed}  />
            ) : (
                <EmptyContent
                    title={'No feed posts found'}
                    subtitle={'Looks like no one has posted in this collection yet'}  />
            )}
        </Container>
    )
}


export default GroupFeed;


const Container = styled(FlexBox)`
height: 100vh;
    
`


