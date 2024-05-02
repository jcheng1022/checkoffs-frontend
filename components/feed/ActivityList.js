import styled from "styled-components";
import {FlexBox} from "@/components/core";
import ActivityItem from "@/components/feed/ActivityItem";
import {DEFAULT_FEED_INCREMENTS} from "@/constants";

const ActivityList = ({ maxHeight = null, list = [], amount = 3, setAmount}) => {





    return (
        <Container maxHeight={maxHeight} direction={'column'} align={'center'} >
            {list?.map((activity, index) => <ActivityItem type={!!activity?.mediaUrl ? 'image' : 'text'} key={`activity-item-${index}`} activity={activity}/>)
            }

        </Container>
    )
}

export default ActivityList


const Container = styled.div`
  overflow-y: auto;
  max-height: ${props => props.maxHeight || '100%'};
  
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
