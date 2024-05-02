import styled from "styled-components";
import PeopleItem from "@/components/people/PeopleItem";

const PeopleList = ({list = []}) => {
    return (
        <Container >
            {list?.map((user, index) => <PeopleItem key={`user-${index}`} user={user}/>)}
        </Container>
    )
}

export default PeopleList;

const Container = styled.div`
  margin: 24px;

`
