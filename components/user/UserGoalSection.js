import React from 'react';

import {FlexBox, Gap} from "@/components/core";
import {Button} from "antd";
import styled from "styled-components";
import {useCollectionsByUserId} from "@/hooks/collections.hook";
import {useCurrentUser} from "@/hooks/user.hook";
import {theme} from "@/styles/themes";
import {useRouter} from "next/navigation";

function UserGoalSection(props) {
    const {data: user} = useCurrentUser();

    const {data: goals} = useCollectionsByUserId(user?.id);
    const router = useRouter();

    return (
        <Container>
            <FlexBox justify={'space-between'} className={'goal-section-header'}>
                <div className={'goal-section-title'}> Your goals</div>
                <Button className={'new-collection-btn'} onClick={() => router.push(`/collections/create?type=USER`)}>
                    <span className={'plus-icon'}> + </span> Collection
                </Button>
            </FlexBox>

            <Gap gap={12}/>




        </Container>
    );
}

export default UserGoalSection;

const Container = styled(FlexBox)`

  
    .new-collection-btn {
      background-color: ${theme.primaryBlue};
      color: white;
      font-size: 18px;
      height: 40px;
    }
    .goal-section-title {
        font-size: 24px;
        font-weight: 600;
    }
  
  .plus-icon {
    font-weight: 800;
    margin-right: 8px;
  }
`
