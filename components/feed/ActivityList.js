import styled from "styled-components";
import {FlexBox} from "@/components/core";
import ActivityItem from "@/components/feed/ActivityItem";

const ActivityList = ({list = []}) => {
    return (
        <Container direction={'column'}>
            {list?.map((activity, index) => <ActivityItem type={!!activity?.mediaUrl ? 'image' : 'text'} key={`activity-item-${index}`} activity={activity}/>)
            }
        </Container>
    )
}

export default ActivityList


const Container = styled(FlexBox)`
  width: 800px;
  

`
