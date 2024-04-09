'use client'

import styled from "styled-components";
import {Button, Input, notification, Spin} from "antd";
import {FlexBox} from "@/components/core";
import {useMemo, useState} from "react";
import {useCurrentUser, usePeopleSearch} from "@/hooks/user.hook";
import APIClient from '@/services/api'
import PeopleList from "@/components/people/PeopleList";
import {theme} from "@/styles/themes";

const Page =   ({}) => {
    const { data: user} = useCurrentUser({
        withFriends: true
    });

    const {data: people } = usePeopleSearch(user?.id)
    const [peopleList, setPeopleList] = useState([])

    const list = useMemo(() => {
        if (!peopleList.length && !people) {
            return [];
        }

        const data = peopleList.length > 0 ? peopleList : people;

        return data.map(o => ({
            ...o,
            isFriend: !!user?.friends?.some(f => [f.userOne, f.userTwo].includes(o.id))
        }));
    }, [peopleList, people, user]);




    const [userInfo, setUserInfo] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async () => {
        if (!userInfo) return;

        setIsLoading(true)

        await APIClient.api.post('/user/find', {userInfo})
            .then(data => {
                setPeopleList(prevData => data)
            }).catch(e => {
                notification.error({
                    description: e.message
                })
            }).finally(() => {
                setIsLoading(false)
            })

    }
    return (
        <Container>
            <FlexBox className={'input-field-container'} wrap={'no-wrap'} gap={24}>
                <Input
                    className={'search-input'}
                    placeholder={'Search using username or email'}
                    value={userInfo}
                    onChange={(e) => setUserInfo(e.target.value)}
                />
                <Button className={'search-btn'} onClick={handleSubmit}> Search</Button>
            </FlexBox>

            <Spin spinning={isLoading}>
                <PeopleList list={list} />
            </Spin>

        </Container>
    )
}

export default Page;



const Container = styled.div`
  
    .input-field-container {
      margin: 24px;
    }
  
  .search-input {
    padding: 12px;
  }
  
  .search-btn {
    //padding: 12px 24px;
    height: 48px;
    color: white;
    font-weight: 600;
    background-color: ${theme.darkBlue_1};
  }
  
    .search-btn:hover {
        background-color: ${theme.lightBlue_1};
    }
`
