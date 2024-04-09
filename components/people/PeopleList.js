import styled from "styled-components";
import {FlexBox} from "@/components/core";
import PeopleItem from "@/components/people/PeopleItem";

const PeopleList = ({list = []}) => {
    console.log(list, 333)
    return (
        <Container >
            {list?.map((user, index) => <PeopleItem key={`user-${index}`} user={user}/>)}
        </Container>
    )
}

export default PeopleList;

const Container = styled.div`
  margin: 24px;
  //width: 1100px;
  //max-width: 1100px;

`
