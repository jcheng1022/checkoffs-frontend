import ViewGroupPage from "@/components/groups/ViewGroupPage";
import GroupPagePermissionWrapper from "@/components/permissionWrappers/GroupPagePermissionWrapper";

const GroupPage = () => {
    return (
        <GroupPagePermissionWrapper type={'VIEW_PAGE'}>
            <ViewGroupPage />
        </GroupPagePermissionWrapper>
    )
}

export default GroupPage;
