import {useGroupMembers} from "@/hooks/groups.hook";
import {useParams} from "next/navigation";
import styled from "styled-components";
import {FlexBox} from "@/components/core";
import {useMemo, useState} from "react";
import {Avatar, Input} from "antd";
import {useUserIsLoggedIn} from "@/hooks/user.hook";
import {theme} from "@/styles/themes";

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
    const isLoggedIn = useUserIsLoggedIn();
    const {data: members} = useGroupMembers(isLoggedIn, groupId)
    const [range, setRange] = useState({
        start: 0,
        end: 4
    })
    const [searchTerm, setSearchTerm] = useState('')
    const visibleMembers = useMemo(() => {
        return members?.filter(o => o?.user?.username.includes(searchTerm))?.slice(range.start, range.end)
    }, [members, range, searchTerm])

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
        <Container direction={'column'} align={'center'} gap={16} wrap={'no-wrap'}>
            <FlexBox style={{width: '100%'}} justify={'flex-end'} >
                <Input
                    placeholder={'Search members'}
                    onChange={(e) => setSearchTerm(e.target.value)} className={'search-input'}   />
            </FlexBox>
            {/*{showArrows && (*/}
            {/*    <div className={'resizing-arrows'} onClick={handleChangeRange('decrease')}> <ChevronLeft/> </div>*/}

            {/*)}*/}
            {visibleMembers?.map((member, index) => {
                return (
                    <FlexBox gap={24} className={'member-card'} key={`member-${index}`}>

                        {/*<FlexBox justify={'center'} align={'center'} style={{*/}
                        {/*    padding: '24px 0px'*/}
                        {/*}}>*/}
                            <Avatar
                                className={'avatar'}
                                // style={{
                                //     width: 75,
                                //     height: 75,
                                //     backgroundColor: '#1677ff',
                                //     fontWeight: 600,
                                //     fontSize: 30
                                // }}
                            >
                                {member?.user?.username[0]?.toUpperCase()}
                            </Avatar>
                        {/*</FlexBox>*/}
                        <div className={'member-name'}>
                            {member?.user?.username}
                        </div>
                    </FlexBox>
                )
            })}

            {/*{ showArrows && (*/}
            {/*    <div  className={'resizing-arrows'}  onClick={handleChangeRange('increase')}> <ChevronRight/> </div>*/}

            {/*) }*/}

        </Container>
    )
}

export default GroupMemberCarousel;

const Container = styled(FlexBox)`
  margin: 24px;

  .member-card {
    border: 1px solid black;
    background-color: ${theme.whiteSmoke};
    border-radius: 12px;
    width: 100%;
    max-width: 1400px;
    padding: 24px 18px;
    //height: 200px;
  }

  .member-card:hover {
    transform: scale(1.02);
    cursor: pointer;
  }

  .member-name {
    text-align: center;
    color: black;
    font-size: 18px;
  }

  .avatar {
         width: 50px;
         height: 50px;
         background-color: #1677ff;
         font-weight: 600;
         font-size: 18px;
  }
  
  .search-input {
    max-width: 250px;
  }


  @media only screen and (max-width: 600px) {

    & {
      flex-direction: column;
    }
    .resizing-arrows {
      display: none;
    }

    .member-card {
      width: 100%;
      height: 125px;
      padding: 18px 24px;
      display: flex;
      gap: 24px;
      align-items: center;

      //align-items: flex-start;

    }

    .member-name {
      font-size: 18px;
    }

    .avatar {
      width: 50px;
      height: 50px;
      font-size: 16px;
    }
  }
`

