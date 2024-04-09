'use client'

import ActivityGraph from "@/components/ActivityGraph";
import {useActivitiesByUser, useActivitiesStatsByUser} from "@/hooks/activity.hook";
import {useMemo} from "react";
import {useCurrentUser} from "@/hooks/user.hook";
import styled from 'styled-components'
import {FlexBox} from "@/components/core";

const UserActivityStats = () => {

    // const { data: user } = useCurrentUser();

    // const {data: stats } = useActivitiesStatsByUser( user?.id,)
    // const graphData = useMemo(() => {
    //     return activities?.map(o => o.date)
    // }, [activities])

    return (
        <Container justify={'center'}>
            Coming soon ( stats)
        </Container>
    )
}

export default UserActivityStats;

const Container = styled(FlexBox)`
  height: 150px;
  margin: 12px 0px;
  background-color: #f5f5f5;
`
