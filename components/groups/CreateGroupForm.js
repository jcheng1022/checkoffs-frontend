'use client';

import styled from "styled-components";
import {Gap} from "@/components/core";
import {Button, Input} from "antd";
import {useState} from "react";
import {useCurrentUser} from "@/hooks/user.hook";
import APIClient from '@/services/api'
import {useRouter} from "next/navigation";
import {useAppContext} from "@/context/AppContext";
import {theme} from "@/styles/themes";

const CreateGroupForm = () => {
    const [form, setForm] = useState({})
    const {data: user} = useCurrentUser()
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { messageNotification } = useAppContext()

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
        return APIClient.api.post('/collections/', form).then((data) => {
            setLoading(false)

            router.push(`/group/${data?.id}/dashboard`)
            messageNotification({
                type: 'success',
                content: 'Created group!'
            })
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


            <Button className={'create-new-group-btn'} onClick={handleSubmit} loading={loading} disabled={loading}>
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
  .ant-input {
    padding: 12px;
  }
  
  .ant-input-disabled {
    background-color: ${theme.jetGrey};
    color: white;
    padding: 12px;
  }
  .create-new-group-btn {
    margin-top: 24px;
    width: 200px;
    height: 60px;
    background-color: ${theme.primaryBlue};
    color: white;
    font-size: 18px;
    border-radius: 12px;
    font-weight: 600;
  }
  
`
