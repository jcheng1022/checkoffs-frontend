import GroupDashboard from "@/components/groups/dashboard/GroupDashboard";
import GroupPagePermissionWrapper from "@/components/permissionWrappers/GroupPagePermissionWrapper";

const GroupDashboardPage = () => {
    return (
        <GroupPagePermissionWrapper type={'DASHBOARD'}>
            <GroupDashboard/>
        </GroupPagePermissionWrapper>
    )
}

export default GroupDashboardPage;

