'use client'

import styled from "styled-components";
import {ContentGutters, FlexBox, Gap} from "@/components/core";
import UserHistoryTable from "@/components/profile/UserHistoryTable"
import UserActivityGraph from "@/components/profile/UserActivityGraph";
import FriendsList from "@/components/profile/FriendsList";
import {useParams, useRouter} from "next/navigation";
import {useCurrentUser, useUserIsLoggedIn, useUserProfile} from "@/hooks/user.hook";
import {Button, Modal, notification, Spin, Tabs} from "antd";
import {ArrowRight} from "react-feather";
import {theme} from "@/styles/themes";
import APIClient from "@/services/api";
import {useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import dayjs from "dayjs";
import ProfilePermissionWrapper from "@/components/ProfilePermissionWrapper";
import GroupList from "@/components/profile/GroupList";
import UserGoalSection from "@/components/user/UserGoalSection";

const  advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)


const UserActivity = () => {
    const { user:userId } = useParams();
    const isLoggedIn = useUserIsLoggedIn();
    const {data: user} = useCurrentUser();
    const [loadingUser, setLoadingUser] = useState(false)

    const {data: profile, isFetching, isLoading, isFetched} = useUserProfile(isLoggedIn, userId ,{
        minimal: true
    })

    const router = useRouter();
    const client = useQueryClient();


    if ( (!isFetching && !isLoading) && profile?.settings?.viewProfile === false) {
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


    const handleAddFriend = async () => {
        // e.stopPropagation();



        setLoadingUser(true)

        await APIClient.api.post(`/user/friends`, {
            friendId: userId
        }).then(() => {
            client.refetchQueries({queryKey: ['user', userId, 'profile']})
            notification.success({
                description: 'Friend request sent'
            })

        }).catch(e =>  notification.error({
            description: e.message || 'Could not send friend request'
        })).finally(() => {

            setLoadingUser(false)
        })

    }

    const isNotSelf = !!user?.id && userId !== user?.id


    const tabOptions = [
        {
            label: 'Friends',
            key: 'friends',
            children: <FriendsList />
        },
        {
            label: 'Groups',
            key: 'groups',
            children: <GroupList />
        },
    ]
    return (
        <ProfilePermissionWrapper>
            {/*<UserProfileSideMenu/>*/}
            <Container>
                <UserHeaderContainer justify={'flex-start'} align={'flex-start'} direction={'column'} bgColor={profile?.settings?.profileColor}>
                    <Spin spinning={(isFetching || isLoading)}>
                        <div className={'username'}>
                            {profile?.username}
                        </div>

                        {profile?.isFriends ? (
                            profile.isFriends.status === 'PENDING' ? (
                                <Button disabled className={'request-sent'}>
                                    Friend Request Sent
                                </Button>
                            ) : (
                                profile.isFriends.status === 'ACCEPTED' && (
                                    <div>{`Friends since ${dayjs(profile.isFriends?.acceptedOn).format('MMMM Do YYYY')}`}</div>
                                )
                            )
                        ) : ( isNotSelf) ? (
                            (
                                <Button onClick={handleAddFriend} className={'add-btn'}>
                                    Add Friend
                                </Button>
                            )
                        ): null}
                    </Spin>


                </UserHeaderContainer>

                <ContentGutters>

                    <MidSection wrap={'no-wrap'} gap={24} align={'flex-end'}>
                        <Tabs

                            className={'ant-tabs-component'}
                            defaultActiveKey="1"

                            items={tabOptions}
                        />


                        <UserActivityGraph />

                    </MidSection>

                    <Gap gap={24}/>
                    <UserGoalSection/>

                    <Gap gap={24}/>

                    {/*<FlexBox justify={'center'} gap={200}  align={'flex-start'}>*/}
                    {/*    <FriendsList />*/}
                    <UserHistoryTable title={`${user?.username}'s activities`} />
                </ContentGutters>
            </Container>
        </ProfilePermissionWrapper>
    )
}


export default UserActivity;

const MidSection = styled(FlexBox)`
  //max-height: 500px;

  //margin: 0px 24px;

  .ant-tabs-nav-wrap {
    justify-content: flex-start;
  }
  @media only screen and (max-width: 900px) {
    & {
      display: block;

      //margin-right: 64px;
      //margin-right: 50px;
      //flex-wrap: wrap;
    }

    .graph-side {
      padding-top: 48px;
      width: 100%;
    }

   
  }
`
const Container = styled.div`


    .top-section {
      margin: 24px;
    }

  .ant-tabs-nav-wrap {
    background-color: ${theme.backgroundBlack};
    color: ${theme.secondaryPink};
    border: none;
  }

  .ant-tabs-tab-btn {
    color: white;
    font-weight: 600;
    font-size: 16px;
    //letter-spacing: 2px;
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


const UserHeaderContainer = styled(FlexBox)`
  height: 200px;
  padding: 24px 48px;

  background-color: ${props =>  props.bgColor ? `#${props?.bgColor}` : theme.jetGrey};
  //margin:24px;

  .username {
    font-size: 40px;
    font-weight: 500;
    //padding: 24px;
  }

  .add-btn {
    width: 150px;
    height: 50px;
    background-color: ${theme.darkBlue_1};
    border-radius: 18px;
    color: white;
    font-weight: 600;
    border: 2px solid ${theme.SNOW};
  }

  .request-sent {
    color: white;
    height: 50px;
    width: 200px;
    font-weight: 600;
    cursor: auto;
  }
`
