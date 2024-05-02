import styled from "styled-components";
import {FlexBox} from "@/components/core";
import ActivityItem from "@/components/feed/ActivityItem";
import {DEFAULT_FEED_INCREMENTS} from "@/constants";

const ActivityList = ({list = [], amount = 3, setAmount}) => {





    return (
        <Container direction={'column'} align={'center'} >
            {list?.map((activity, index) => <ActivityItem type={!!activity?.mediaUrl ? 'image' : 'text'} key={`activity-item-${index}`} activity={activity}/>)
            }

            {/*<FlexBox justify={'center'} className={'show-more-section'}>*/}
            {/*    <div onClick={() => setAmount(prev => prev + DEFAULT_FEED_INCREMENTS)}> Show more</div>*/}
            {/*</FlexBox>*/}
        </Container>
    )
}

export default ActivityList


const Container = styled.div`
  //width: 800px;
  overflow-y: auto;
  
  .show-more-section {
    margin: 36px 0px;
    
    div {
        color: #1890ff;
        cursor: pointer;
    }
    
    div:hover {
      font-weight: 500;
    }
  }
  

`
