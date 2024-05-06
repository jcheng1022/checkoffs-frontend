'use client';

import {useParams} from "next/navigation";
import {useUserIsLoggedIn} from "@/hooks/user.hook";
import {useViewGroupPermission} from "@/hooks/groups.hook";
import PermissionDenied from "@/components/PermissionDenied";
import {ROLES} from "@/constants";

const GroupPagePermissionWrapper = ({type = 'VIEW_PAGE', children}) => {
    const {groupId} = useParams();
    const isLoggedIn = useUserIsLoggedIn();

    const {data: permission , isLoading, isFetching} = useViewGroupPermission(isLoggedIn, groupId, type)

    if (!isLoading && !isFetching && !!permission) {
        if (type === 'DASHBOARD') {
            if (permission?.role === ROLES.ADMIN || permission?.role === ROLES.OWNER) {
                return children;
            } else {
                return <PermissionDenied />
            }
        } else if (type === 'VIEW_PAGE') {
            if (permission?.role) {
                return children;
            } else {
                return <PermissionDenied />
            }
        }

        if (permission?.action === 'UNAUTHORIZED') {
            return <PermissionDenied />
        }
    }


}

export default GroupPagePermissionWrapper;

