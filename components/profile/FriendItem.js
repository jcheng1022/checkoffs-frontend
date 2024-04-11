'use client'

import styled from "styled-components";
import {FlexBox} from "@/components/core";
import {Avatar, Dropdown} from "antd";
import {MoreVertical} from "react-feather";
import {useEffect, useState} from "react";
import {getDatabase, onValue, ref} from "firebase/database";
import {useRouter} from "next/navigation";


const FriendItem = ({friend}) => {
    const [isOnline, setIsOnline] = useState(false)
    const router = useRouter();

    useEffect(() => {
        const getStatus = () => {

            const db = getDatabase()

            const path = `/user/${friend.friendId}/status`
            onValue(ref(db, path), snapshot => {
                if (snapshot.val() == false) {
                    return;
                }

                if (snapshot.val()?.state === 'online') {
                    setIsOnline(true)
                } else {
                    setIsOnline(false)
                }


            })
        }

        getStatus()
    }, [])

    const items = [
        {
            key: 'friend-profile',
            label: (
                <div onClick={() => router.push(`/user/${friend?.id}`)}>
                    View Profile
                </div>
            ),
        },
        // {
        //     key: 'sign-out',
        //     label: (
        //
        //         <div onClick={logOut} >
        //             Sign Out
        //         </div>
        //
        //     ),
        // }
    ]
    return (
        <Container align={'flex-start'}>
            <FlexBox gap={8} align={'center'}>
                <Avatar
                    style={{
                        backgroundColor: '#1677ff',
                    }}
                >
                    {friend.username[0]}
                </Avatar>
                <div>
                    <div className={'username'}>
                        {friend.username}
                    </div>
                    <div className={'activity-text'}>{isOnline ? 'Active now' : 'Offline'}</div>
                </div>
            </FlexBox>
            <FlexBox justify={'flex-end'} align={'center'}>
                <Dropdown
                    trigger={['click']}

                    menu={{
                        items
                    }}
                >
                    <MoreVertical  style={{cursor: 'pointer'}}/>

                </Dropdown>
            </FlexBox>
        </Container>
    )
}

export default FriendItem;

const Container = styled(FlexBox)`
  margin: 12px 0px;
  //border: 1px solid black;
  width: 100%;
  padding: 12px;
  height: 30px;
  
  .username {
    font-weight: 500;
  }
  .activity-text {
    font-size: 12px;
    text-align: start;
    color: #7c81a2;
  }
`
