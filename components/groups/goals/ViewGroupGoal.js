'use client'
import React, {useMemo} from 'react';
import styled from "styled-components";
import {useGroupGoalById} from "@/hooks/groups.hook";
import {useParams} from "next/navigation";
import {Spin} from "antd";
import {FlexBox} from "@/components/core";
import dayjs from "dayjs";
import {theme} from "@/styles/themes";
import ActivityGraph from "@/components/ActivityGraph";
import ActivityList from "@/components/feed/ActivityList";

function ViewGroupGoal(props) {
    const { groupId, goalId } = useParams();
    console.log(groupId, goalId, 2444)
    const  {data: goal, isFetching, isLoading} = useGroupGoalById(groupId, goalId, {
        withFeed: true
    });

    const graphData = useMemo(() => {
        return goal?.posts?.map(o => o.date)
    }, [goal])
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

               <FlexBox>
                   <div style={{minWidth: 100, maxWidth: 800, padding: 24}}>
                       <ActivityGraph activity={graphData} />
                   </div>
                   <ActivityList list={goal?.posts} />
               </FlexBox>
           </Container>
       </Spin>
    );
}

export default ViewGroupGoal;

const TopSection = styled(FlexBox)`
  background-color: #73b8ba;
  height: 250px;
  .goal-base-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    //width: 400px;
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
    // color: ${theme.SNOW};
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
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 1.5px;
    width: 100%;
    margin: 0px 24px;
    text-align: center;
  }

  @media screen and (max-width: 992px) {
    
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
        // color: ${theme.SNOW};
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


const Container = styled.div`

`
