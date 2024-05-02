import {Button, DatePicker, Input} from "antd";
import {Gap} from "@/components/core";
import styled from "styled-components";
import {useState} from "react";
import dayjs from "dayjs";
const {TextArea} = Input;
import APIClient from '@/services/api'
import {useParams} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";
const CreateGroupGoal = ({onClose}) => {
    const {groupId} = useParams();
    const [form, setForm] = useState({

    })
    const client = useQueryClient();

    const handleInputChange = (name) => (e) => {
        const value = typeof e === 'string' ? e : e.target.value;
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        console.log(form, 'formmm')
        return APIClient.api.post(`/groups/${groupId}/goals`, form).then(() => {
            onClose();
            client.refetchQueries({queryKey:  ['group-goals', 'dashboard', groupId, {page: 1, size: 10}]})
        })
    }
    return (
        <>
            <Input placeholder="Goal Name" onChange={handleInputChange('name')} />
            <Gap gap={12}/>

            <TextArea placeholder="Goal Description (optional)" onChange={handleInputChange('description')} />

            <DatePicker onChange={(date) => setForm({
                ...form,
                endDate: dayjs(date).format('YYYY-MM-DD')
            })} />



            <Gap gap={48}/>



            <Bottom>
                <ExtraInfo > Creating a goal will simultaneously create a feed where group members can upload and attach their activity posts to. All activity posts linked to the goal will be visible to other group members.</ExtraInfo>
                <Button onClick={handleSubmit}  type="primary">Create Goal</Button>
            </Bottom>
        </>
    )
}

export default CreateGroupGoal;

const Bottom = styled.div`
  position: absolute;
  bottom: 10px;
`


const ExtraInfo = styled.div`
    font-size: 10px;
    color: #666666;
    margin-top: 12px;
    margin-bottom: 12px;
    max-width: 400px;

`
