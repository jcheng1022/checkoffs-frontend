'use client'

import styled from "styled-components";
import {Button, Input, notification, Spin} from "antd";
import {FlexBox} from "@/components/core";
import {useMemo, useState} from "react";
import {useCurrentUser, usePeopleSearch} from "@/hooks/user.hook";
import APIClient from '@/services/api'
import PeopleList from "@/components/people/PeopleList";

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
                <Input onChange={(e) => setUserInfo(e.target.value)}/>
                <Button onClick={handleSubmit}> Search</Button>
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
      margin: 24px 12px;
    }
`
