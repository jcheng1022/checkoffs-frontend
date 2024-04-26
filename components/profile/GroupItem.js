'use client'

import styled from "styled-components";
import {FlexBox} from "@/components/core";
import {useRouter} from "next/navigation";

const GroupItem = ({group}) => {
    const router = useRouter()
    return (
        <Container onClick={() => router.push(`/group/${group.id}`)}>
            <div>
                <div className={'title'}> {group?.name}</div>
                <div className={'owner'}> Owner: {group?.creator.username}</div>
            </div>

        </Container>
    )
}

export default GroupItem;

const Container = styled(FlexBox)`
  .title {
    font-size: 16px;
    font-weight: 600;
  }
  
  .owner {
    font-size: 12px;
    font-weight: 400;
    color: #8c8c8c;
  }
`
