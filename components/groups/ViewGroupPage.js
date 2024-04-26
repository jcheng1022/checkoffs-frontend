'use client';
import styled from "styled-components";
import {useParams, useRouter} from "next/navigation";
import {useGroupById} from "@/hooks/groups.hook";
import dayjs from "dayjs";
import {Crown} from "lucide-react";
import {FlexBox} from "@/components/core";
import GroupMemberCarousel from "@/components/groups/GroupMemberCarousel";
import {Settings} from "react-feather";
import {useCurrentUser} from "@/hooks/user.hook";

const ViewGroupPage = () => {
    const {groupId} = useParams();
    const router = useRouter()
    const {data: user} = useCurrentUser();

    const {data: group, isFetching, isLoading} = useGroupById(groupId);


    return (
        <Container>

            <div className={'top-heading'}>
                <FlexBox justify={'space-between'}>
                    <div className={'name'}> {group?.name}</div>
                    {group?.creator?.id === user?.id && (
                        <div className={'settings-icon'} onClick={() => router.push(`/group/${group?.id}/dashboard`)}>
                            <Settings color={'white'}/>
                        </div>
                    )}
                </FlexBox>
                <div className={'creation-date'}> {`Existed since ${dayjs(group?.createdAt).format(`MMMM Do YYYY`)}`}</div>

                <FlexBox justify={'flex-start'}>
                    <div className={'creator'}>
                        Created by <span className={'creator-name'}> {group?.creator?.username} </span>

                    </div>
                    <Crown fill={'#FFD700'} color={'#FFD700'} width={36} strokeWidth={2}/>

                </FlexBox>

            </div>

            <GroupMemberCarousel />
        </Container>
    )
}

export default ViewGroupPage;

const Container = styled.div`
  
  .top-heading {
    background-color: #313638;
    padding: 24px;


  }
  
  .settings-icon:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
  

  
  .name {
    font-size: 48px;
    font-weight: 700;
    color: white;
    letter-spacing: 2px;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;

  }
  .creator {
    font-size: 12px;
    color: white;
  }
  
  .creator-name {
    font-weight: 600;
  }
  
  .creator-name:hover {
    text-decoration: underline;
    cursor: pointer;
    color: #FFD700;
  }
  
  .creation-date {
    font-size: 14px;
    font-weight: 400;
    color: grey;
    font-style: italic;
  }
`
