'use client'

import styled from "styled-components";
import {FlexBox, Gap} from "@/components/core";
import UserHistoryTable from "@/components/profile/UserHistoryTable"
import UserActivityGraph from "@/components/profile/UserActivityGraph";
import UserActivityStats from "@/components/profile/UserActivityStats";
import FriendsList from "@/components/profile/FriendsList";
import {useParams, useRouter} from "next/navigation";
import {useUserIsLoggedIn, useUserPrivacy} from "@/hooks/user.hook";
import {Modal} from "antd";
import Link from "next/link";
import {ArrowRight} from "react-feather";


const UserActivity = () => {
    const { user:userId } = useParams();
    const isLoggedIn = useUserIsLoggedIn();
    const {data: privacy, isFetching, isLoading} = useUserPrivacy(isLoggedIn, userId)
    const router = useRouter();

    if ( (!isFetching && !isLoading) && privacy?.isPublic === false) {
        return (
            <PrivateModal centered open={true} closeIcon={false} maskClosable={false} footer={null}>
                <FlexBox justify={'center'}>
                    {`Sorry, this user's profile is private`}
                </FlexBox>

                <Gap gap={24}/>

                <FlexBox justify={'center'} gap={8}>
                    <div className={'redirect-text'} onClick={() => {
                    router.push(`/`)}
                    }>Go back to home</div>
                    <ArrowRight size={14} color={'#1890ff'} />
                </FlexBox>
            </PrivateModal>
        )
    }


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

const PrivateModal = styled(Modal)`

  .redirect-text {
    color: #1890ff;
    cursor: pointer;
  }
  
  .redirect-text:hover {
    text-decoration: underline;
  }
`
