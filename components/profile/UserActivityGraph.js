'use client'

import ActivityGraph from "@/components/ActivityGraph";
import {useActivitiesByUser} from "@/hooks/activity.hook";
import {useMemo} from "react";
import {useUserIsLoggedIn} from "@/hooks/user.hook";
import styled from 'styled-components'
import {theme} from "@/styles/themes";
import ActivityGraphSkeleton from "@/components/skeletons/ActivityGraphSkeleton";
import {useParams} from "next/navigation";

const UserActivityGraph = () => {

    const isLoggedIn = useUserIsLoggedIn();
    const { user:userId } = useParams();
    const {data: activities, isFetching, isLoading } = useActivitiesByUser( isLoggedIn,{
        dateOnly: true,
        userId
    })

    const graphData = useMemo(() => {
        return activities?.map(o => o.date)
    }, [activities])

    return (
        <Container>
            {/*<div style={{*/}
            {/*    marginLeft: 24,*/}
            {/*    marginBottom: 12,*/}
            {/*    fontWeight: 500*/}
            {/*}}> My Activity</div>*/}
            {(isFetching || isLoading) ?
                <ActivityGraphSkeleton /> :
                <ActivityGraph activity={graphData}/>
            }
        </Container>
    )
}

export default UserActivityGraph;


const Container = styled.div`
  min-width: 0; /* Ensure the graph container can shrink */
  flex: ${(props) => props.flex || 1};
//margin: 24px 24px;
  min-height: 300px;
  background-color: ${theme.backgroundBlack};
  //padding: 24px 0px;
  max-width: 100%;
  
  @media only screen and (max-width: 600px) {
    padding: 0;
    //margin: 0px 12px 0px 24px;
  }
  

`
