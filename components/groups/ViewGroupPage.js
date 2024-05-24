'use client';
import styled from "styled-components";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {useGroupById} from "@/hooks/groups.hook";
import dayjs from "dayjs";
import {Crown} from "lucide-react";
import {FlexBox} from "@/components/core";
import GroupMemberCarousel from "@/components/groups/GroupMemberCarousel";
import {Activity, List, Settings, Users} from "react-feather";
import {useCurrentUser} from "@/hooks/user.hook";
import {Menu} from "antd";
import {useEffect, useState} from "react";
import GroupFeed from "@/components/groups/tabs/GroupFeed";
import GroupGoals from "@/components/groups/tabs/GroupGoals";

const MENU_ITEMS = {
    FEED: 'feed',
    MEMBERS: 'members',
    GOALS: 'goals',
}

const ViewGroupPage = () => {
    const {groupId} = useParams();
    const router = useRouter()
    const searchParams = useSearchParams()
    const tab = searchParams.get('tab') || MENU_ITEMS.FEED

    const {data: user} = useCurrentUser();
    const [openMenuKey, setOpenMenuKey] = useState([])

    const {data: group, isFetching, isLoading} = useGroupById(groupId);

    const iconProps = {
        width: 20
    }
    const menuItems = [
        {
            key: 'feed',
            icon: <List {...iconProps}  />,
            label: 'Feed'
        },
        {
            key: 'members',
            icon: <Users {...iconProps} />,
            label: 'Members'
        },
        {
            key: 'goals',
            icon: <Activity {...iconProps}  />,
            label: 'Goals'
        },

       ]

    if (group?.creatorId === user.id) {
        menuItems.push({
            key: 'settings',
            icon: <Settings {...iconProps} />,
            label: 'Settings'
        })
    }

    let isMobile = window?.matchMedia("(max-width: 600px)")?.matches;

    useEffect(() => {
        if (tab) {
            setOpenMenuKey(tab)
        }
    }, [tab])

    return (
        <Container isMobile={isMobile}>

            <div className={'top-heading'}>
                <FlexBox justify={'space-between'}>
                    <div className={'group-name'}> {group?.name}</div>
                    {group?.creator?.id === user?.id && (
                        <div className={'settings-icon'} onClick={() => router.push(`/group/${group?.id}/dashboard/?tab=members`)}>
                            <Settings color={'white'}/>
                        </div>
                    )}
                </FlexBox>
                <div className={'creation-date'}> {`Existed since ${dayjs(group?.createdAt).format(`MMMM Do YYYY`)}`}</div>

                <FlexBox justify={'flex-start'}>
                    <div className={'creator'}>
                        Created by <span className={'creator-name'}> {group?.creator?.username} </span>

                    </div>
                    <Crown fill={'#FFD700'} color={'#FFD700'} width={36} strokeWidth={2}/>

                </FlexBox>

            </div>
            <FlexBox align={'flex-start'} wrap={'no-wrap'} style={{width: '100%'}}>
                <Menu
                    mode={'horizontal'}
                    // mode={isMobile ? 'horizontal' : 'inline'}
                    defaultSelectedKeys={[tab]}
                    openKeys={openMenuKey}
                    onClick={(val) => {
                        setOpenMenuKey(val.key)
                        if (val.key === 'settings') {
                            router.push(`/group/${group?.id}/dashboard`)
                        } else {
                            router.push(`?tab=${val.key}`)

                        }


                    }}
                    disabledOverflow={true}
                    inlineCollapsed={isMobile}

                    className={'view-group-menu'}
                    items={menuItems}
                />

                {openMenuKey === MENU_ITEMS.FEED && (
                    <GroupFeed />
                )}
                {openMenuKey === MENU_ITEMS.MEMBERS && (
                    <GroupMemberCarousel />
                )}
                {openMenuKey === MENU_ITEMS.GOALS && (
                    <GroupGoals />
                )}
            </FlexBox>
        </Container>
    )
}

export default ViewGroupPage;

const Container = styled.div`
  
  .top-heading {
    background-color: #313638;
    padding: 24px;


  }
  
  .settings-icon:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
  

  
  .group-name {
    font-size: 48px;
    font-weight: 700;
    color: white;
    letter-spacing: 2px;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;

  }
  .creator {
    font-size: 12px;
    color: white;
  }
  
  .creator-name {
    font-weight: 600;
  }
  
  .creator-name:hover {
    text-decoration: underline;
    cursor: pointer;
    color: #FFD700;
  }
  
  .creation-date {
    font-size: 14px;
    font-weight: 400;
    color: grey;
    font-style: italic;
  }
  .ant-menu-title-content {
    width: 100%;
  }
  .ant-menu-item {
    border-radius: 0;
    margin: 0px;
    //color: white;
    letter-spacing: 1.01px;
    font-weight: 500;
    max-width: 100%;
    display: flex;
    align-items: center;
    width: 100%;
    max-width: ${props => props?.isMobile && '120px'};
    height: 60px;
    //flex: 1;

  }

  .view-group-menu {
    height: 100vh;
    min-width: 200px;
    width: 200px;
    max-width: 200px;






    .ant-menu-overflow-item {
      text-align: ${props => props.isMobile ? 'center': 'left'};
      width: 25%;
    }

  }
  
  @media only screen and (max-width: 600px) {
    .view-group-menu {
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      height: fit-content;
      max-width: none;
      width: 100%;
      padding: 8px;
      z-index: 999; /* Ensure it's above other content */
    }
  }
  
  
  

`
