'use client'

import ActivityGraph from "@/components/ActivityGraph";
import {useAuthContext} from "@/context/AuthContext";
import {useActivitiesByUser} from "@/hooks/activity.hook";
import {useMemo} from "react";

const UserActivityGraph = () => {
    console.log(`graph rerendering`)
    const { user } = useAuthContext()
    // const {data: user} = useCurrentUser();

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
