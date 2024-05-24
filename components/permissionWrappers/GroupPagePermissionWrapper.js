'use client';

import {useParams} from "next/navigation";
import {useCurrentUser} from "@/hooks/user.hook";
import PermissionDenied from "@/components/PermissionDenied";
import {ROLES} from "@/constants";
import {Spin} from "antd";
import {FlexBox} from "@/components/core";

const GroupPagePermissionWrapper = ({type = 'VIEW_PAGE', children}) => {
    const {groupId} = useParams();
    const {data: user, isPending} = useCurrentUser();


    if (isPending ){
        return (
            <FlexBox justify={'center'} align={'center'} style={{width: '100%', height: '100vh'}}>
                <Spin/>
            </FlexBox>
        )
    }


    const hasAccess = user?.groups?.find(group => group.id === groupId)



    // const {data: permission , isLoading, isFetching} = useViewGroupPermission(isLoggedIn, groupId, type)

    if (hasAccess) {
        if (type === 'DASHBOARD') {
            if (hasAccess.role === ROLES.ADMIN || hasAccess?.role === ROLES.OWNER) {
                return children;
            } else {
                return <PermissionDenied />
            }
        } else if (type === 'VIEW_PAGE') {
            if (hasAccess?.role) {
                return children;
            } else {
                return <PermissionDenied />
            }
        }

    }


    if (!hasAccess) {
        return <PermissionDenied />
    }


}

export default GroupPagePermissionWrapper;

