import styled from "styled-components";
import {DashboardSection} from "@/components/groups/dashboard/shared/DashboardSection";

const GroupNotificationsSection = () => {
    return (
        <DashboardSection title={'Notifications'} subtitle={'Group Members'} description={'View and manage group members'}>
            <Container>
                Members
            </Container>
        </DashboardSection>
    )
}

export default GroupNotificationsSection;

const Container = styled.div``
