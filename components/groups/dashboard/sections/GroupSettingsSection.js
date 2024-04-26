import styled from "styled-components";
import {DashboardSection} from "@/components/groups/dashboard/shared/DashboardSection";

const GroupSettingsSection = () => {
    return (
        <DashboardSection title={'Settings'} subtitle={'Group Members'} description={'View and manage group members'}>
            <Container>
                Members
            </Container>
        </DashboardSection>
    )
}

export default GroupSettingsSection;

const Container = styled.div``
