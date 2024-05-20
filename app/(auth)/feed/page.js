'use client'


import ActivityFeed from "@/components/feed/ActivityFeed";
import {Suspense} from "react";
import LoadingFeed from "@/components/skeletons/LoadingFeed";

const Page =  ({}) => {


    return (
        <Suspense fallback={<LoadingFeed />}>
           <ActivityFeed />
        </Suspense>
    )
}

export default Page;



// const Container = styled.div``
