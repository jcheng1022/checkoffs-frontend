import {Button, Input, Modal, notification} from "antd";
import {FlexBox, Gap} from "@/components/core";
import {useState} from "react";
import APIClient from '@/services/api'
import {useQueryClient} from "@tanstack/react-query";
const ConfirmDelete = ({open, onCancel}) => {
    const client = useQueryClient();
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)

    const handleChange = (name) => (e) => {
        setForm({
            ...form,
            [name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        if (!form.username) {
            return notification.error({
                message: 'Error',
                description: 'Username is required'
            })
        }

        if (form.username.length < 5) {
            return notification.error({
                message: 'Error',
                description: 'Username must be at least 5 characters'
            })
        }

        if (!/^[a-zA-Z0-9]+$/.test(form.username)) {
            return notification.error({
                message: 'Error',
                description: 'Username must not have special characters, spaces nor symbols'
            })
        }

        setLoading(true)

        return APIClient.api.patch(`/user`, form).then(() => {
            setLoading(false)
            client.refetchQueries({queryKey: ['currentUser']})
            onCancel()
        }).catch(e => {
            console.log(e)
            return notification.error({
                message: 'Error',
                description: e.message
            })
        }).finally(() => setLoading(false))

    }
    return (
        <Modal maskClosable={false} open={open} onCancel={onCancel} footer={null} closable={false} closeIcon={false} centered>
           <FlexBox direction={'column'} align={'center'} style={{margin: '12px 0px'}}>
               <div style={{fontSize: 16, fontWeight:500}}> Finish Setting Up Account</div>
               <Gap gap={24}/>
               <Input style={{textAlign:'center'}} placeholder={'My Amazing Username'} onChange={handleChange('username')} />
           </FlexBox>

            <div> Username must: </div>
            <ul>
                <li>have at least 5 characters</li>
                <li>NOT have no special characters, spaces nor symbols </li>
                <li>be unique! If already taken, try a different one</li>

            </ul>

            <FlexBox justify={'center'}>
                <Button disabled={!form?.username} key={'finish-btn'} style={{width: 300, height: 35}} type={'primary'} onClick={handleSubmit}> Finish </Button>
            </FlexBox>
        </Modal>
    )
}

export default ConfirmDelete


