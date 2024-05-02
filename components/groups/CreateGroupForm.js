'use client';

import styled from "styled-components";
import {Gap} from "@/components/core";
import {Button, Input} from "antd";
import {useState} from "react";
import {useCurrentUser} from "@/hooks/user.hook";
import APIClient from '@/services/api'
import {useRouter} from "next/navigation";

const CreateGroupForm = () => {
    const [form, setForm] = useState({})
    const {data: user} = useCurrentUser()
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleChange = (name) => (e) => {
        setForm({
            ...form,
            [name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('submit', form)
        setLoading(true)
        return APIClient.api.post('/groups/', form).then((data) => {
            setLoading(false)
            router.push(`/group/${data?.id}`)
        })
    }
    return (
        <Container>
            <div className={'title'}> A New Group</div>
            <div className={'subtitle'}> {`Let's get started by providing basic information of the group`}</div>

            <Input placeholder={'Enter a name for your group'} onChange={handleChange('name')} />

            <Gap gap={24}/>

            <div className={'section-title'}> Owner </div>
            <div className={'section-subtitle'}> By default, you will be the owner of the group.</div>
            <Input disabled value={user?.username}  />

            <Gap gap={24}/>

            {/*<div className={'section-title'}> Members </div>*/}
            {/*<div className={'section-subtitle'}> Add members to the group.</div>*/}

            <Button onClick={handleSubmit}>
                Create Group
            </Button>


        </Container>
    )
}

export default CreateGroupForm;

const Container = styled.div`
  margin: 24px;
  .title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .subtitle {
    font-size: 14px;
    color: grey;
  }
  
  .section-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 4px;
  }
  
  .section-subtitle {
    font-size: 12px;
    color: grey;
  }
  
  input {
    margin-top: 10px;
  }
  
  button {
    width: 150px;
    height: 50px;
    background-color: #1890ff;
    color: white;
    border-radius: 12px;
    font-weight: 600;
  }
`
