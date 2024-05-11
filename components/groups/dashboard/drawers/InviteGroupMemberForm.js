import {Button, Input} from "antd";
import {FlexBox, Gap} from "@/components/core";
import {useState} from "react";
import styled from "styled-components";
import APIClient from '@/services/api'
import {useParams} from "next/navigation";
import {theme} from "@/styles/themes";
import {useQueryClient} from "@tanstack/react-query";
import {useAppContext} from "@/context/AppContext";

const InviteGroupMemberForm = ({open, onClose}) => {
    const [form, setForm] = useState({
        invitedUsers: []
    })
    const { messageNotification} = useAppContext()
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
            messageNotification({
                type: 'error',
                content: 'Oops! Search term cannot be empty'
            })
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
            messageNotification({
                type: 'success',
                content: 'Removed from invite list'
            })
        } else {
            setForm({
                ...form,
                invitedUsers: [...form?.invitedUsers, user]
            })
            messageNotification({
                type: 'success',
                content: 'Added to list'
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
        <Container>
            <FlexBox wrap={'no-wrap'} align={'flex-start'} gap={12} direction={'column'}>
                <div className={'search-heading'}> Search by username</div>
                <FlexBox wrap={'no-wrap'} direction={'row'} gap={12}>
                    <Input onChange={e => setSearchTerm(e.target.value)} value={searchTerm} placeholder={'Search by username'} />
                    <Button style={{backgroundColor: theme.softBlue_2, color: 'white', fontWeight: 600, width: 150}} onClick={handleSearchUsers}>
                        Search
                    </Button>
                </FlexBox>
            </FlexBox>

            <UserListContainer>
                <div className={'user-list-title'}> Invited Users</div>
                <div style={{height: 500}}>
                    {userList?.length > 0 ? (
                        userList.map(user => {
                            const isInvited = form?.invitedUsers?.find(o => o.id === user.id)
                            return (
                                <FlexBox className={'invited-user-container'} key={user.id} justify={'space-between'}>
                                    <div className={'invited-username'}>
                                        {user.username}
                                    </div>
                                    <Button className={'invite-btn'} onClick={handleInviteBtn(user)}>
                                        {isInvited ? 'Remove' : 'Invite'}
                                    </Button>
                                </FlexBox>
                            )})


                    ) : (
                        <div style={{marginTop: 100, marginLeft: 100}}> No users yet</div>
                    )}

                </div>
                <Gap gap={48}/>

                <Button
                    key={'send-invite-btn'}
                    className={'send-invite-btn'}
                    disabled={form?.invitedUsers?.length === 0}
                    // type={'primary'}
                    onClick={handleSendInvite}>
                    Send Invite(s)
                </Button>
            </UserListContainer>

        </Container>
        // </Drawer>
    )
}

export default InviteGroupMemberForm;

const Container = styled.div`
.search-heading {
  color: black;
  font-size: 16px;
  font-weight: 500;
  
  
}
`

const UserListContainer = styled.div`
  margin: 24px 0px;
  .invited-user-container {
    padding: 12px;
    //border-radius: 12px;
  }
  .invited-user-container:hover {
    border-bottom: 2px solid ${theme.primaryBlue};
    border-radius: 0;

  }
  
  .invite-btn {
    background-color: ${theme.secondary};
    color: white;
    font-size: 16px;
    width: 100px;
    font-width: 700;
  }
  .invited-username {
    color: black;
  }
  .user-list-title { 
    font-size: 16px;
    font-weight: 600;
  }
  
  .send-invite-btn {
    background-color: ${theme.primaryBlue};
    color: white;
    font-size: 14px;
    width: 200px;
    height: 50px
  }
`
