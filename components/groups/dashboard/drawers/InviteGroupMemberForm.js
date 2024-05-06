import {Button, Input} from "antd";
import {FlexBox, Gap} from "@/components/core";
import {useState} from "react";
import styled from "styled-components";
import APIClient from '@/services/api'
import {useParams} from "next/navigation";
import {theme} from "@/styles/themes";
import {useQueryClient} from "@tanstack/react-query";

const InviteGroupMemberForm = ({open, onClose}) => {
    const [form, setForm] = useState({
        invitedUsers: []
    })
    const {groupId} = useParams();
    const [searchTerm, setSearchTerm] = useState('')
    const [userList, setUserList] = useState([])
    const client = useQueryClient();



    const handleSendInvite = async () => {
        return APIClient.api.post(`/collections/${groupId}/invite`, {
            users: form?.invitedUsers
        }).then(() => {
             client.refetchQueries({queryKey:  ['group-members', 'dashboard', groupId, {page: 1, size: 10}]})
            onClose();

        })
    }
    const handleSearchUsers = () => {
        if (!searchTerm )  {
            return;
        }

        return APIClient.api.post(`/user/find`, {
            userInfo: searchTerm,
            type: 'username'
        }, {
            params: {
                excludeSelf: true
            }
        }).then(data => setUserList(data))
    }

    const handleInviteBtn =(user) => () => {
        if (form?.invitedUsers?.find(o => o.id === user.id)) {
            setForm({
                ...form,
                invitedUsers: form?.invitedUsers?.filter(o => o.id !== user.id)
            })
        } else {
            setForm({
                ...form,
                invitedUsers: [...form?.invitedUsers, user]
            })
        }
    }
    return (
        // <Drawer
        //     open={open}
        //     placement={'right'}
        //     closeIcon={<ArrowLeft/>}
            // extra={[
            //        <Button
            //            key={'send-invite-btn'}
            //            disabled={form?.invitedUsers?.length === 0} type={'primary'} onClick={handleSendInvite}>
            //            Send Invite(s)
            //        </Button>
            // ]}
            // onClose={onClose}>
        <>
            <FlexBox wrap={'no-wrap'} gap={12}>
                <Input onChange={e => setSearchTerm(e.target.value)} value={searchTerm} placeholder={'Search by username'} />
                <Button style={{backgroundColor: theme.softBlue_2, color: 'white', fontWeight: 600, width: 150}} onClick={handleSearchUsers}>
                    Search
                </Button>
            </FlexBox>

            <UserListContainer>
                <div className={'user-list-title'}> Invited Users</div>
                {userList?.length > 0 ? (
                    userList.map(user => {
                        const isInvited = form?.invitedUsers?.find(o => o.id === user.id)
                        return (
                            <FlexBox key={user.id} justify={'space-between'}>
                                <div>
                                    {user.username}
                                </div>
                                <Button onClick={handleInviteBtn(user)}>
                                    {isInvited ? 'Remove from Invite' : 'Invite'}
                                </Button>
                            </FlexBox>
                        )})


                ) : (
                    <div style={{marginTop: 100, marginLeft: 100}}> No users yet</div>
                )}

                <Gap gap={48}/>

                <Button
                    key={'send-invite-btn'}
                    disabled={form?.invitedUsers?.length === 0} type={'primary'} onClick={handleSendInvite}>
                    Send Invite(s)
                </Button>
            </UserListContainer>

        </>
        // </Drawer>
    )
}

export default InviteGroupMemberForm;


const UserListContainer = styled.div`
  margin: 24px 0px;
  
  .user-list-title { 
    font-size: 16px;
    font-weight: 600;
  }
`
