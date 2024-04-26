import styled from "styled-components";
import {DashboardSection} from "@/components/groups/dashboard/shared/DashboardSection";

const GroupGoalsSection = () => {
    return (
        <DashboardSection title={'Goals'} subtitle={'Group Members'} description={'View and manage group members'}>
            <Container>
                Members
            </Container>
        </DashboardSection>
    )
}

export default GroupGoalsSection;

const Container = styled.div``
