import {Button, List, notification} from "antd";
import APIClient from "@/services/api";
import {FlexBox} from "@/components/core";
import {NOTIFICATION_TYPES, STATUS} from "@/constants";
import {useEffect, useMemo, useState} from "react";
import {useCurrentUser, useNotificationsByUser} from "@/hooks/user.hook";
import {useDocumentData} from "react-firebase-hooks/firestore";
import {doc} from "firebase/firestore";
import {firestoreClient} from "@/lib/firebase/firebase";
import {Globe} from "react-feather";
import {useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import styled from "styled-components";

const NotificationsList = ({}) => {
    const [props, setProps] = useState({
        lastUpdated: null
    })
    const [showNotifications, setShowNotifications] = useState(false)
    const router = useRouter()
    const {data: user} = useCurrentUser()


    const { data: notifications, isLoading, isFetching, refetch: refetchNotifcations  } = useNotificationsByUser(!!user, showNotifications,  props);
    const [newNotifications, setNewNotifications] = useState(false)
    const client = useQueryClient();

    const [updateValue, loading, error] = useDocumentData(doc(firestoreClient, `notifications/${user?.firebaseUuid}`), {
        snapshotListenOptions: { includeMetadataChanges: true } } )
    let isMobile = window?.matchMedia("(max-width: 600px)")?.matches;


    const isLoadingNotifications = isLoading || isFetching
    useEffect(() => {
        if ( updateValue?.lastUpdated > updateValue?.lastViewed  || (!updateValue?.lastViewed && updateValue?.lastUpdated ) ) {
            refetchNotifcations().then(() => {
                setNewNotifications(true)

            })

        }
    }, [updateValue])
    useEffect(() => {

        if (props?.lastUpdated && updateValue?.lastUpdated && updateValue?.lastUpdated !== props.lastUpdated) {

            setProps({
                ...props,
                force: !!props.lastUpdated,
                lastUpdated: updateValue?.lastUpdated,
            })
        }
    }, [updateValue, notifications])

    const notificationList = useMemo(() => {
        return notifications?.filter(notification => {
            if (notification?.type === NOTIFICATION_TYPES.FRIEND_REQUEST || notification?.type === NOTIFICATION_TYPES.GROUP_INVITE) {
               return  !notification?.body.status || notification?.body?.status === 'PENDING'
            }

            if (notification?.type === NOTIFICATION_TYPES.NEW_COLLECTIONS_POST ) {
                return  notification
            }
        })
    }, [notifications])




    const handleRespond = (type, item, response) => () => {
        if ( type === NOTIFICATION_TYPES.FRIEND_REQUEST ) {
                return APIClient.api.patch(`/user/friends`, {
                    notificationId: item?.id,
                    requestUserId: item?.body?.sender?.id,
                    respondUserId: item?.userId,
                    status: response,
                }).then(async () => {
                    await client.refetchQueries({queryKey: ['notifications', props]})
                }).catch(e => {
                    notification.error({
                        message: 'Error',
                        description: e?.message
                    })
                })

        } else if ( type === NOTIFICATION_TYPES.GROUP_INVITE ) {
            return APIClient.api.patch(`/collections/${item?.body?.group?.id}/invite`, {
                notificationId: item?.id,
                userId: user?.id,
                status: response,
            }).then(async () => {
                await client.refetchQueries({queryKey: ['notifications', props]})
            }).catch(e => {
                notification.error({
                    message: 'Error',
                    description: e?.message
                })
            })

        }
    }
    return (
        <Container>

            <div style={{ position: 'relative' }}>
                <Globe
                    className={'notification'}
                    color={'black'}
                    size={20}
                    onClick={() => {
                        setShowNotifications(prev => !prev)
                        setNewNotifications(false);
                    }}
                />
                {newNotifications && (
                    <div
                        style={{
                            position: 'absolute',
                            width: 8,
                            height: 8,
                            backgroundColor: 'red',
                            borderRadius: '50%',
                            bottom: 5,
                            right: 0,
                        }}
                    />
                )}
            </div>

            {/*<Globe className={'notification'} color={'black'} size={20} onClick={() => setShowNotifications(prev => !prev)} />*/}

            <div className={'notification-list'} style={{
                display: showNotifications ? 'block' : 'none',
                width: 400,
                position: 'absolute',
                top: 50,
                right: isMobile ? 5 : 40,
                zIndex: 100,
                backgroundColor: 'white',
                padding: 12,
                borderRadius: 12,
                border: '1px solid #e0dede'
            }
            }>

                {
                    notificationList?.length > 0 ? (
                        <>
                            {/*<div className={'notif-headers'}> Buddy Requests</div>*/}
                            <List

                                itemLayout="horizontal"
                                dataSource={notificationList}
                                renderItem={(item, index) => {

                                    let message;
                                    if (item?.type === NOTIFICATION_TYPES.FRIEND_REQUEST) {
                                        message = `You have a friend request from ${item?.body?.sender?.username}`
                                    } else if (item?.type === NOTIFICATION_TYPES.GROUP_INVITE) {
                                        message = `You have been invited to join ${item?.body?.group?.name} group`

                                    } else if (item?.type === NOTIFICATION_TYPES.NEW_COLLECTIONS_POST) {
                                        message = `${item?.body?.sender?.username} has recently posted in your shared group!`
                                    }

                                    return (
                                        <List.Item>
                                            <FlexBox>
                                                <div style={{color: 'black'}} className={'buddy-name'}> {message}</div>
                                            </FlexBox>

                                            {(item?.type === NOTIFICATION_TYPES.FRIEND_REQUEST || item?.type === NOTIFICATION_TYPES.GROUP_INVITE) && (
                                                <FlexBox justify={'space-between'}>
                                                    <Button
                                                        onClick={handleRespond(item?.type, item, STATUS.ACCEPTED)}
                                                        style={{backgroundColor: 'green', color: 'white'}}
                                                    >
                                                        Accept
                                                    </Button>
                                                    <Button
                                                        onClick={handleRespond(item?.type, item, STATUS.DECLINED)}
                                                        style={{backgroundColor: 'red', color: 'white'}}
                                                    >
                                                        Decline
                                                    </Button>
                                                </FlexBox>)}

                                            {item?.type === NOTIFICATION_TYPES.NEW_COLLECTIONS_POST && (
                                                <Button onClick={() => router.push(`/group/${item?.body?.collectionId}`)}>
                                                    View
                                                </Button>
                                            )}

                                        </List.Item>
                                    )
                                }}
                            />
                        </>
                    ) : (
                        <FlexBox style={{width: '100%' }} justify={'center'} className={'no-notifications'}>
                            {isLoadingNotifications ? 'Loading ...' : 'No notifications'}
                        </FlexBox>
                    )
                }

            </div>


        </Container>
    )
}

export default NotificationsList;


const Container = styled.div`
  .buddy-name {
    max-width: 250px;
  }
`
