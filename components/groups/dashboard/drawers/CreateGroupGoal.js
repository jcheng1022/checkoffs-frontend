import {Button, DatePicker, Input} from "antd";
import {Gap} from "@/components/core";
import styled from "styled-components";
import {useState} from "react";
import dayjs from "dayjs";
import APIClient from '@/services/api'
import {useParams} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";
import {theme} from "@/styles/themes";

const {TextArea} = Input;
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
        return APIClient.api.post(`/collections/${groupId}/goals`, form).then(() => {
            onClose();
            client.refetchQueries({queryKey:  ['group-goals', 'dashboard', groupId, {page: 1, size: 10}]})
        })
    }
    return (
        <Container>
            <div className={'create-goal-input-title'}> Name</div>
            <div className={'create-goal-input-description'}> Give your goal a name that members will be able to identify</div>
            <Input placeholder="Goal Name" onChange={handleInputChange('name')} />
            <Gap gap={24}/>

            <div className={'create-goal-input-title'}> Description</div>
            <div className={'create-goal-input-description'}> Provide a few words for members to better understand the goal</div>
            <TextArea placeholder="Goal Description (optional)" onChange={handleInputChange('description')} />


            <Gap gap={24}/>
            <div className={'create-goal-input-title'}> Start Date (Optional)</div>
            <div className={'create-goal-input-description'}> Specify when users will be able to start making entries for this goal. <span className={'default-text'}>By default, the start date is today. </span></div>
            <DatePicker onChange={(date) => setForm({
                ...form,
                startDate: dayjs(date).format('YYYY-MM-DD')
            })} />

            <Gap gap={24}/>

            <div className={'create-goal-input-title'}> End Date (Optional)</div>
            <div className={'create-goal-input-description'}> Specify when the last day of this goal will be. <span className={'default-text'}>By default, there is no end date </span></div>
            <DatePicker onChange={(date) => setForm({
                ...form,
                endDate: dayjs(date).format('YYYY-MM-DD')
            })} />



            <Gap gap={48}/>



            <Bottom>
                <ExtraInfo > Creating a goal will simultaneously create a feed where group members can upload and attach their activity posts to. All activity posts linked to the goal will be visible to other group members.</ExtraInfo>
                <Button onClick={handleSubmit}  type="primary">Create Goal</Button>
            </Bottom>
        </Container>
    )
}

export default CreateGroupGoal;
const Container = styled.div`
  
  .create-goal-input-title {
    font-size: 14px;
    font-weight: 500;
    
  }
  
  .create-goal-input-description {
    font-size: 10px;
    color: #666666;
    margin-bottom: 6px;
  }
  
  .default-text {
    font-size: 10px;
    color: ${theme.primary};
    font-weight: 600;
  }
`


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
