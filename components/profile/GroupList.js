import styled from "styled-components";
import {theme} from "@/styles/themes";
import EmptyContent from "@/components/EmptyContent";
import {useGroupsByUserId, useUserIsLoggedIn} from "@/hooks/user.hook";
import {useParams} from "next/navigation";
import {Spin} from "antd";
import GroupItem from "@/components/profile/GroupItem";

const GroupList = () => {

    const isEmpty = true;
    const isLoggedIn = useUserIsLoggedIn();
    const { user:userId } = useParams();
    const {data: groups, isFetching, isLoading} = useGroupsByUserId(isLoggedIn, userId, {})
    return (
        <Container>

            {(isFetching || isLoading) ? <Spin /> : groups?.length > 0 ? groups.map((groupItem, index) => {
                return (
                    <GroupItem key={`group-${index}`} group={groupItem.group}/>
                )
            }) : <EmptyContent title={'No groups...yet!'} subtitle={'Create or join a group'} route={'/groups/create'} />}

            {/*{ isEmpty && <EmptyContent title={'No groups...yet!'} subtitle={'Create or join a group'} route={'/groups/create'} /> }*/}


        </Container>
    )
}


export default GroupList;

const Container = styled.div`
  margin: 24px 24px;
  height: 300px;
  padding: 24px;
  border-radius: 12px;
  background-color: ${theme.WHITE};

`
