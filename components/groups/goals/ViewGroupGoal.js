'use client'
import React, {useMemo, useState} from 'react';
import styled from "styled-components";
import {useGroupGoalById} from "@/hooks/groups.hook";
import {useParams} from "next/navigation";
import {Avatar, Button, Spin, Tooltip} from "antd";
import {FlexBox} from "@/components/core";
import dayjs from "dayjs";
import {theme} from "@/styles/themes";
import ActivityGraph from "@/components/ActivityGraph";
import ActivityList from "@/components/feed/ActivityList";
import {getCountdown} from "@/utils";
import ViewGroupMembers from "@/components/modals/ViewGroupMembers";

const removeDuplicates = (array) => {
    const uniqueIds = {};
    return array?.filter(obj => {
        if (!uniqueIds[obj?.id]) {
            uniqueIds[obj?.id] = true;
            return true;
        }
        return false;
    });
};

function ViewGroupGoal(props) {
    const { groupId, goalId } = useParams();
    const [openViewGroupMembersModal, setOpenViewGroupMembersModal] = useState(false)
    const  {data: goal, isFetching, isLoading} = useGroupGoalById(groupId, goalId, {
        withFeed: true
    });


    const {graphData, users, duration} = useMemo(() => {

        const posts = goal?.posts?.map(o => o.date);
        const users = goal?.posts.map(o => o.user)


        const duration = goal?.endDate ? dayjs(goal?.endDate).diff(dayjs(goal?.createdAt), 'days') : 364

        return {
            duration,
            graphData: posts,
            users: removeDuplicates(users)
        }
    }, [goal])

    console.log(getCountdown(goal?.endDate), goal?.endDate, 323232)



    return (
       <Spin spinning={isFetching || isLoading}>
           <Container>

               <TopSection >
                   <div className={'goal-base-info'}>
                       <div className={'goal-name'}> {goal?.name}</div>
                       <div className={'goal-start-date'}> Created {dayjs(goal?.createdAt).format('MMMM DD YYYY')}</div>
                       {goal?.endDate && <div className={'goal-end-date'}> Ends {dayjs(goal?.endDate).format('MMMM DD YYYY')}</div>}

                   </div>
                   <div className={'goal-description'}> &quot;{goal?.description}&quot;</div>

               </TopSection>

                   <div style={{minWidth: 100, padding: 24}}>
                       <ActivityGraph type={'group'} activity={graphData} duration={duration} />
                   </div>

               <BottomSection gap={10} align={'flex-start'} >
                   <div className={'participant-container'}>
                       <div className={'participant-count'}>
                           <span className={'count-number'}>{users?.length}</span> {users?.length > 1 ? 'people have' : 'person has'} participated in this goal
                       </div>
                       {users?.map((user, index) => {
                            return (
                                <div key={index} className={'goal-user-participant'}>
                                    <Avatar
                                        className={'user-avatar'}
                                    >
                                        {user.username[0].toUpperCase()}
                                    </Avatar>
                                    <span className={'participant-username'}> {user.username} </span>
                                </div>
                            )
                       })
                       }

                       <div className={'nudge-section'}>
                           <Tooltip title={'Coming Soon'}>
                               <Button onClick={() => setOpenViewGroupMembersModal(true)} className={'nudge-button'}>
                                   Nudge a Group Member
                               </Button>
                           </Tooltip>
                       </div>
                   </div>
                   <div className={'list-scrolling-container'}>
                       <ActivityList maxHeight={100} list={goal?.posts} />
                   </div>
               </BottomSection>
               { !!openViewGroupMembersModal && <ViewGroupMembers groupId={groupId} open={openViewGroupMembersModal} onClose={() => setOpenViewGroupMembersModal(false)}/> }
           </Container>
       </Spin>
    );
}

export default ViewGroupGoal;

const TopSection = styled(FlexBox)`
  background-color: #73b8ba;
  height: 300px;
  .goal-base-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 150px;
    padding: 24px;
    margin: 0px 24px;
    background-color:#7cbdbf;
    border: 2px solid ${theme.softBlue_2};
    border-radius: 12px;
    
  }

  .goal-name {
    font-size: 26px;
    font-weight: 500;
    margin-bottom: 12px;
  }
  .goal-start-date {
    font-size: 14px;
    font-weight: 400;
    color: ${theme.SNOW};
  }
  .goal-end-date {
    font-size: 14px;
    font-weight: 400;
    color: ${theme.SNOW};
  }
  
  .goal-description {
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 1.5px;
    width: 100%;
    margin: 0px 24px;
    text-align: center;
  }


  @media only screen and (max-width: 600px) {
    
    & {
      height: 250px;
    }

    .goal-base-info {
      width: 400px;
      height: 125px;
      text-align: center;
      margin: 0px 12px; 


    }

    .goal-name {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 12px;
    }
    .goal-start-date {
      font-size: 12px;
      font-weight: 400;
      color: ${theme.SNOW};
    }
    .goal-end-date {
      font-size: 12px;
      font-weight: 400;
      color: ${theme.SNOW};
    }

    .goal-description { 
      font-size: 12px;
      margin: 0px 24px;
      text-align: center;
    }
  }


`

const BottomSection = styled(FlexBox)`
  width: 100%;
  margin: 24px;
  flex-wrap: nowrap;


 
  .user-avatar {
    width: 35px;
    height: 35px;
    background-color: #1677ff;
    font-weight: 600;
    font-size: 16px;
  }
  
  .participant-container {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    min-height: 300px;
    min-width: 350px;
    padding: 12px;
    border-radius: 12px;
  }
  
  .participant-count {
    padding: 12px;
    font-size: 16px
  }

  .nudge-section {
    margin-top: auto; /* Push this section to the bottom */

  }
  .nudge-button {
    width: 100%;
    height: 50px;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1.1px;
    background-color: ${theme.softBlue_2};
  }
  
  .count-number {
    font-weight: 600;
  }
  .participant-username {
    margin-left: 12px;
  }
  
  .list-scrolling-container {
    width: 100%;
    max-height: 100px;
  }
  
  .goal-user-participant {
     border-radius: 12px;
    padding: 12px;
  }
  
  .goal-user-participant:hover {
    background-color: ${theme.softBlue_2};
    cursor: pointer;
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    margin: 0px;
    
    .list-scrolling-container {}

    .user-avatar {
      width: 50px;
      height: 50px;
      font-size: 20px;
    }
  }
  
`

const Container = styled.div`

`
