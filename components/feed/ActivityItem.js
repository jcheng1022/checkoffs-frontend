'use client';

import styled from "styled-components";
import {FlexBox} from "@/components/core";
import dayjs from "dayjs";
import {Dropdown, Spin} from "antd";
import {useAuthContext} from "@/context/AuthContext";
import {MoreVertical} from "react-feather";
import APIClient from '@/services/api'
import {useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import ConfirmDelete from "@/components/feed/ConfirmDelete";


const  advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)


const ActivityItem = ({activity, type = 'image'}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const client = useQueryClient();
    const handleAction = (actionType) => async () => {

        const params = actionType === 'archive' ? {
            archiveDate: dayjs().format()
            }: {}
        await APIClient.api.delete(`/activity/${activity.id}`, {
            params
        }).then(() => {
            client.refetchQueries({queryKey: ['feed', activity?.user?.id]})
            setIsDeleting(false)

        })
    }
    const items = [
        {
            key: 'edit',
            label: (
                <div>
                    Edit
                </div>
            ),
        },
        {
            key: 'delete',
            label: (

                    <div onClick={() => setIsDeleting(true)} >
                        Delete
                    </div>

            ),
        },
        {
            key: 'archive',
            label: (
                <div onClick={handleAction('archive')} >
                    Archive
                </div>
            ),
        }
    ]
    const {user} = useAuthContext();
    const isOwner = user?.id === activity?.user?.id;


    return (
        <Container type={type}>
            <Spin spinning={isLoading}>

                <FlexBox justify={'space-between'} className={'activity-meta'}>
                    <div className={'name'}> {activity?.user?.username ? activity.user.username : user?.name}</div>

                    <FlexBox justify={'flex-end'} gap={8}>
                        <div className={'date'}> {dayjs(activity?.date).format('MMM Do YYYY')}</div>
                        {isOwner && (
                            <Dropdown
                                trigger={['click']}

                                menu={{
                                    items,
                                }}
                            >
                                <MoreVertical size={20} className={'more-icon'}/>
                            </Dropdown>
                        )}
                    </FlexBox>
                </FlexBox>

                {type === 'image' && (
                    <div className={'image-container'}>
                        <img src={activity?.mediaUrl}  className={'image'} />
                    </div>
                )}
                <div className={'description'}> {activity?.description} </div>

            </Spin>
            <ConfirmDelete
                onCancel={ () => setIsDeleting(false)}
                open={isDeleting}
                onSubmit={handleAction('delete')}
            />
        </Container>
    )
}

export default ActivityItem


const Container = styled.div`
  min-width: 400px;
  max-width: 400px;
  height: ${props => props.type === 'image' ? '400px' : '100px'};
  max-height: ${props => props.type === 'image' ? '400px' : '100px'};
  width: 400px;
  background-color: #fafafa;
  margin: 4px 0px;
  
  .more-icon {
    cursor: pointer;
  }
  .activity-meta {
    padding: 12px 8px;
  }
  //.name {
  //  padding: 12px 8px;
  //}
  .date {
    
  }
  
    .description {
        padding: 8px;
    }

  .image-container {
    width: 100%;
    height: 300px;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit:cover;
  }
`
