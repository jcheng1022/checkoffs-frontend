'use client';

import styled from "styled-components";
import {FlexBox} from "@/components/core";
import dayjs from "dayjs";
import {Dropdown, Input, notification, Spin, Tag} from "antd";
import {MessageCircle, MoreVertical} from "react-feather";
import APIClient from '@/services/api'
import {useEffect, useRef, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import ConfirmDelete from "@/components/feed/ConfirmDelete";
import {useCurrentUser} from "@/hooks/user.hook";
import {useActivityActionMutation} from "@/hooks/activity.hook";
import Comment from "@/components/feed/Comment";
import {theme} from "@/styles/themes";
import {useParams, useRouter} from "next/navigation";


const  advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)


const ActivityItem = ({activity, type = 'image'}) => {

    const [isLoading, setIsLoading] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isLiked, setIsLiked] = useState(activity?.isLiked > 0);
    const [likeCount, setLikeCount] = useState(activity?.likeCount)
    const [comment, setComment] = useState('')
    const [userComments, setUserComments] = useState([])
    const [showCommentInput, setShowCommentInput] = useState(false)
    const client = useQueryClient();
    const inputRef = useRef(null)
    const { groupId } = useParams();
    const router = useRouter();

    const {mutateAsync} = useActivityActionMutation(activity?.id)

    const handleCommentInput = async (e) => {
        setComment(e.target.value)
    }
    useEffect(() => {
        if (showCommentInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showCommentInput]);

    useEffect(() => {
        setUserComments(activity?.comments)
    }, [activity])

    const handleSubmitComment = async () => {
        const combined = [...userComments, {message: comment, user: {username: user?.username}}]
        setUserComments(combined)
        setShowCommentInput(false)



         mutateAsync({type: 'COMMENT', message: comment}).then(() => {

            setComment('');
        }).catch((e) => {

             setUserComments(combined.slice(0, -1))
             setShowCommentInput(true)
             notification.error({
                 message: 'Something went wrong',
                 description: e.message
             })
         })
    }
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
        // {
        //     key: 'edit',
        //     label: (
        //         <div>
        //             Edit
        //         </div>
        //     ),
        // },
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
    const {data: user} = useCurrentUser();
    const isOwner = user?.id === activity?.userId;

    const actionProps = {
        size: 18,
        color: '#000'
    }
    const convertToNumber = (val) => {
        return typeof val === 'string' ? parseInt(val) : val
    }
    const toggleLiked = async () => {
        if (isLiked) {
            setLikeCount(prev => convertToNumber(prev) -1)
        } else {
            setLikeCount(prev => convertToNumber(prev) +1)
        }
        setIsLiked(prev => !prev)
        await mutateAsync({type: 'LIKE'});

    }

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
                <ItemFooterContainer>
                    <FlexBox gap={12} className={'actions'}>
                            <img  className={'action-icon'} width={18} onClick={toggleLiked}  src={`/icons/${isLiked? 'like' : 'empty-heart'}.png`}/>
                        <div> {likeCount}</div>

                        <MessageCircle onClick={() => setShowCommentInput(prev => !prev)}  className={'action-icon'} {...actionProps} />
                        {activity?.goal?.id && (
                            <FlexBox justify={'flex-end'} onClick={() => router.push(`/group/${groupId}/goal/${activity.goal.id}`)}>
                                <Tag color={'blue'} style={{fontWeight: 500}} > {activity.goal.name}</Tag>
                            </FlexBox>
                        )}
                    </FlexBox>


                    <div className={'comments-container'}
                        style={{maxHeight: 150, overflowY: "auto"}}
                    >
                        {userComments.map((comment, index) => {
                            return (
                                <Comment key={`activity-${activity.id}-comment-${index}`} comment={comment}/>
                            )
                        })}

                        {/* TODO: find a way to limit showing all the comments here*/}
                        {/*{activity?.commentCount > 3 && (*/}
                        {/*    <div className={'show-more'}> {`Showing ${userComments?.length} of ${activity?.commentCount} comments ... show more`} </div>*/}
                        {/*)}*/}
                    </div>

                    {showCommentInput && (
                        <Input allowClear
                               ref={inputRef}
                               onPressEnter={handleSubmitComment}
                               placeholder={'Press enter to send comment'}
                               value={comment}
                               onChange={handleCommentInput} />
                    )}
                </ItemFooterContainer>
            </Spin>
            {!!isDeleting && (
                <ConfirmDelete
                    onCancel={ () => setIsDeleting(false)}
                    open={isDeleting}
                    onSubmit={handleAction('delete')}
                />
            )}
        </Container>
    )
}

export default ActivityItem


const Container = styled.div`
  min-width: 400px;
  max-width: 400px;
  width: 400px;
  background-color: #fafafa;
  margin: 10px 0px;
  
  .more-icon {
    cursor: pointer;
  }
  .activity-meta {
    padding: 12px 8px;
  }

  .date {
    
  }
  
    .description {
      text-align: left;
        padding: 8px;
      font-size: 14px;
    }

  .image-container {
    width: 100%;
    height: 250px;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit:cover;
  }

  @media only screen and (max-width: 600px) {
    min-width: 350px;
    max-width:  350px;
    width:  350px;
  }
`

const ItemFooterContainer = styled.div`
  padding: 12px;
  text-align: start;
  .actions {
    
  }
  
  .show-more {
    font-size: 12px;
    font-weight: 500;
    color: ${theme.GREY};
    margin: 12px 0px;
  }

  .show-more:hover {
    color: #1890ff;
    cursor: pointer;
    transform: scale(1.001);
  }
  .
  
  .comments-container{
    text-align: start;
    margin: 12px 0px;

  }
  
  .action-icon {
    cursor: pointer;
  }
  .action-icon:hover {
    transform: scale(1.1);
  }
`
