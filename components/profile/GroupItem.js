'use client'

import styled from "styled-components";
import {FlexBox} from "@/components/core";
import {useRouter} from "next/navigation";
import {theme} from "@/styles/themes";

const GroupItem = ({group}) => {
    const router = useRouter()
    return (
        <Container onClick={() => router.push(`/group/${group.id}`)}>
            <div className={'group-info'}>
                <div className={'title'}> {group?.name}</div>
                <div className={'owner'}> Owner: <span className={'owner-name'}> {group?.creator.username} </span></div>
            </div>

        </Container>
    )
}

export default GroupItem;

const Container = styled.div`
  padding: 8px 12px;
  border-radius: 6px;
  .title {
    font-size: 16px;
    color: white;
    font-weight: 600;
  }
  
  .owner {
    font-size: 12px;
    font-weight: 400;
    color: #8c8c8c;
  }
  
  .owner-name {
    font-weight: 600;
  }

  //.group-info:hover {
  //
  //  cursor: pointer;
  //  border-bottom: 1px solid #f0f0f0;
  //  border-radius: 0px;
  //  
  //}
  
  // &:hover {
  //
  //   .title {
  //     color: ${theme.primaryBlue};
  //   }
  //
  //   .owner {
  //     color: ${theme.secondaryPink};
  //   }
  // }
  //background-color: #f0f0f0;
    
`
