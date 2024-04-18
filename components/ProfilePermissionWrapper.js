import {useCurrentUser, usePermissionByUser, useUserIsLoggedIn} from "@/hooks/user.hook";
import {Spin} from "antd";
import PermissionDenied from "@/components/PermissionDenied";
import {useParams} from "next/navigation";

const ProfilePermissionWrapper = ({children}) => {
    const isLoggedIn = useUserIsLoggedIn();
    const {data: user, isLoading: loadingUser, isFetching: fetchingUser} = useCurrentUser();
    const params = useParams();
    const { user:userId } = params;
    const {data: permission, isLoading, isFetching} = usePermissionByUser(isLoggedIn, userId)

    const loading = loadingUser || isLoading || isFetching || fetchingUser;

    if (loading) return <Spin fullscreen />

    if (!loading && !permission?.canViewProfile ) return <PermissionDenied />

    return (
        <>
            {children}
        </>
    )
}

export default ProfilePermissionWrapper;
