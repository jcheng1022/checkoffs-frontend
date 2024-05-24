'use client';

import styled from "styled-components";
import {Gap} from "@/components/core";
import {Button, Input} from "antd";
import {useState} from "react";
import {useCurrentUser} from "@/hooks/user.hook";
import APIClient from '@/services/api'
import {useRouter, useSearchParams} from "next/navigation";
import {useAppContext} from "@/context/AppContext";
import {theme} from "@/styles/themes";
import {COLLECTION_TYPES} from "@/constants";
import {useQueryClient} from "@tanstack/react-query";
import PostCollectionCreation from "@/components/modals/creatingCollection/PostCollectionCreation";

const { TextArea } = Input;

const CreateCollection = ({type}) => {
    const [form, setForm] = useState({})
    const {data: user} = useCurrentUser()
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { messageNotification } = useAppContext()
    const searchParams = useSearchParams()
    const client = useQueryClient();
    const [postCollectionModal, setPostCollectionModal] = useState(false)

    const typeParam = searchParams.get('type')
    const redirectTo = searchParams.get('redirectTo')
    console.log(redirectTo, 'redirect')

    const collectionType = typeParam ? typeParam : !!type ? type:  COLLECTION_TYPES.GROUP


    const handleChange = (name) => (e) => {
        const val = typeof e === 'string' ? e : e.target.value
        setForm({
            ...form,
            [name]: val
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('submit', form)
        setLoading(true)
        return APIClient.api.post('/collections/', form, {
            params: {
                type: collectionType
            }
        }).then((data) => {
            setLoading(false)
            if (collectionType === COLLECTION_TYPES.GROUP) {
                messageNotification({
                    type: 'success',
                    content: 'Created group!'
                })
                router.push(`/group/${data?.id}/dashboard`)

            } else {
                messageNotification({
                    type: 'success',
                    content: 'Created collection!'
                })

                if (redirectTo) {
                    console.log(redirectTo, 23232)

                    client.refetchQueries({queryKey: ['collections', COLLECTION_TYPES.USER, user?.id, {}]})

                    router.push(`/${redirectTo}`)

                }  else {
                    router.push(`/user/${user.id}`)
                }


            }


        })
    }

    const title = collectionType === COLLECTION_TYPES.GROUP ? 'Create a new group' : type === COLLECTION_TYPES.USER ? 'Create a new self goal': 'Create a new collection'
    const subtitle = collectionType === COLLECTION_TYPES.GROUP ? 'Let\'s get started by providing basic information of the group' : 'Let\'s get started by providing basic information of the collection'

    const namePlaceholder = collectionType === COLLECTION_TYPES.GROUP ? 'Enter a name for your group' : 'Enter a name for your collection'
    const descriptionPlaceholder = collectionType === COLLECTION_TYPES.GROUP ? 'This is a group' : 'This is a collection'
    const createBtnText = collectionType === COLLECTION_TYPES.GROUP ? 'Create Group' : 'Create Collection'
    return (
        <Container>
            <div className={'title'}> {title}</div>
            <div className={'subtitle'}> {subtitle}</div>

            <Gap gap={12}/>

            <div className={'input-labels'}> Name</div>
            <Input placeholder={namePlaceholder} onChange={handleChange('name')} />
            <Gap gap={24}/>

            <div className={'input-labels'}> Description</div>
            <TextArea  placeholder={descriptionPlaceholder} onChange={handleChange('description')} />

            <Gap gap={24}/>

            {collectionType === COLLECTION_TYPES.GROUP && (
                <>

                    <div className={'section-title'}> Owner </div>
                    <div className={'section-subtitle'}> By default, you will be the owner of the group.</div>
                    <Input disabled value={user?.username}  />

                </>
                )}
            <Gap gap={24}/>


            <Button className={'create-new-group-btn'} onClick={handleSubmit} loading={loading} disabled={loading}>
                {createBtnText}
            </Button>

            {postCollectionModal && (<PostCollectionCreation open={!!postCollectionModal} onCancel={() => setPostCollectionModal(false)} type={type} />)}


        </Container>
    )
}

export default CreateCollection;

const Container = styled.div`
  margin: 24px;
  
  .input-labels {
    font-size: 16px;
    color: white;
    font-weight: 600;
  }
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
