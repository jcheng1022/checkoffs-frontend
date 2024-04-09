'use client'

import ActivityGraph from "@/components/ActivityGraph";
import {useActivitiesByUser} from "@/hooks/activity.hook";
import {useMemo} from "react";
import {useCurrentUser} from "@/hooks/user.hook";

const UserActivityGraph = () => {

    const { data: user } = useCurrentUser();

    const {data: activities } = useActivitiesByUser( user?.id,{
        dateOnly: true
    })
    const graphData = useMemo(() => {
        return activities?.map(o => o.date)
    }, [activities])

    return (
        <>

            <ActivityGraph activity={graphData}/>
        </>
    )
}

export default UserActivityGraph;
