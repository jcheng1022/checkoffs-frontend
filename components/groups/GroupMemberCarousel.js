import {useGroupMembers} from "@/hooks/groups.hook";
import {useParams} from "next/navigation";
import styled from "styled-components";
import {FlexBox} from "@/components/core";
import {useMemo, useState} from "react";
import {ChevronLeft, ChevronRight} from "react-feather";
import {Avatar} from "antd";

const AMNT_VISIBLE = 5;

const testData = [
    {
        user: {
            username: 'test1'
        }
    },
    {
        user: {
            username: 'test2'
        }
    },
    {
        user: {
            username: 'test3'
        }
    },
    {
        user: {
            username: 'test4'
        }
    },
    {
        user: {
            username: 'test5'
        }
    },
    {
        user: {
            username: 'test6'
        }
    },
    {
        user: {
            username: 'test7'
        }
    },
    {
        user: {
            username: 'test8'
        }
    },
    {
        user: {
            username: 'test9'
        }
    },
    {
        user: {
            username: 'test10'
        }
    }
];


const GroupMemberCarousel = () => {
    const {groupId} = useParams();
    const {data: members} = useGroupMembers(groupId)
    const [range, setRange] = useState({
        start: 0,
        end: 4
    })
    const visibleMembers = useMemo(() => {
        return members?.map(o => o?.user?.username)?.slice(range.start, range.end)
    }, [members, range])

    const handleChangeRange = (direction) =>  () => {
       if (direction === 'decrease' && range.start > 0) {
              setRange(prev => {
                    return {
                        start: prev.start - 1,
                        end: prev.end - 1
                    }
              })
       }
        if (direction === 'increase' && range.end < members?.length) {
            setRange(prev => {
                return {
                    start: prev.start + 1,
                    end: prev.end + 1
                }
            })
        }

    }
    const showArrows = members?.length > AMNT_VISIBLE;
    return (
        <Container gap={16} wrap={'no-wrap'}>
            {showArrows && (
                <div onClick={handleChangeRange('decrease')}> <ChevronLeft/> </div>

            )}
            {visibleMembers?.map((member, index) => {
                return (
                    <div className={'member-card'} key={`member-${index}`}>

                        <FlexBox justify={'center'} align={'center'} style={{
                            padding: '24px 0px'
                        }}>
                            <Avatar
                                style={{
                                    width: 75,
                                    height: 75,
                                    backgroundColor: '#1677ff',
                                    fontWeight: 600,
                                    fontSize: 30
                                }}
                            >
                                {member[0].toUpperCase()}
                            </Avatar>
                        </FlexBox>
                        <div className={'member-name'}>
                            {member}
                        </div>
                    </div>
                )
            })}

            { showArrows && (
                <div onClick={handleChangeRange('increase')}> <ChevronRight/> </div>

            ) }

        </Container>
    )
}

export default GroupMemberCarousel;

const Container = styled(FlexBox)`
  margin: 24px;
  
  .member-card {
    border: 1px solid black;
    border-radius: 12px;
    width: 150px;
    height: 200px;
  }
  
  .member-card:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
  
  .member-name {
    text-align: center;
  }
`

