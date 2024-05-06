import styled from "styled-components";
import {theme} from "@/styles/themes";
import EmptyContent from "@/components/EmptyContent";
import {useGroupsByUserId, useUserIsLoggedIn} from "@/hooks/user.hook";
import {useParams, useRouter} from "next/navigation";
import {Button, Spin} from "antd";
import GroupItem from "@/components/profile/GroupItem";
import {FlexBox} from "@/components/core";

const GroupList = () => {

    const isLoggedIn = useUserIsLoggedIn();
    const { user:userId } = useParams();
    const router = useRouter();

    const {data: groups, isFetching, isLoading} = useGroupsByUserId(isLoggedIn, userId, {})
    return (
        <Container>
                <FlexBox justify={'flex-end'}>
                    <Button onClick={() => router.push(`/groups/create`)}  type={'primary'}> Create Group </Button>
                </FlexBox>

            {(isFetching || isLoading) ? <Spin /> : groups?.length > 0 ? groups.map((groupItem, index) => {
                return (
                    <GroupItem key={`group-${index}`} group={groupItem.group}/>
                )
            }) : <EmptyContent title={'No groups...yet!'} subtitle={'Create or join a group'} route={'/groups/create'} />}



        </Container>
    )
}


export default GroupList;

const Container = styled.div`
  margin: 24px 24px;
  height: 300px;
  max-height: 300px;
  overflow-y: auto;
  padding: 24px;
  border-radius: 12px;
  background-color: ${theme.WHITE};

`
