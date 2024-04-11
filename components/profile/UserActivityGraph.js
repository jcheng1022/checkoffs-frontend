'use client'

import ActivityGraph from "@/components/ActivityGraph";
import {useActivitiesByUser} from "@/hooks/activity.hook";
import {useMemo} from "react";
import {useCurrentUser, useUserIsLoggedIn} from "@/hooks/user.hook";
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
            <div style={{
                marginLeft: 24,
                marginBottom: 12,
                fontWeight: 500
            }}> My Activity</div>
            {(isFetching || isLoading) ?
                <ActivityGraphSkeleton /> :
                <ActivityGraph activity={graphData}/>
            }
        </Container>
    )
}

export default UserActivityGraph;


const Container = styled.div`
  
  background-color: ${theme.WHITE};
  padding: 24px;
`
