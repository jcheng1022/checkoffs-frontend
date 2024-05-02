import ActivityList from "@/components/feed/ActivityList";
import {useGroupFeed} from "@/hooks/groups.hook";
import {useParams} from "next/navigation";
import styled from "styled-components";
import {FlexBox} from "@/components/core";
import {useUserIsLoggedIn} from "@/hooks/user.hook";

const GroupFeed = () => {
    const {groupId} = useParams()
    const isLoggedIn = useUserIsLoggedIn()
    const {data: feed } = useGroupFeed(isLoggedIn, groupId);
    return (
        <Container justify={'center'}>
            <ActivityList list={feed}  />
        </Container>
    )
}


export default GroupFeed;


const Container = styled(FlexBox)`
`


