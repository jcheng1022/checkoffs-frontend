import {Button, List} from "antd";
import APIClient from "@/services/api";
import {FlexBox} from "@/components/core";
import {NOTIFICATION_TYPES} from "@/constants";
import {useEffect, useState} from "react";
import {useCurrentUser, useNotificationsByUser, useUserIsLoggedIn} from "@/hooks/user.hook";
import {useDocumentData} from "react-firebase-hooks/firestore";
import {doc} from "firebase/firestore";
import {firestoreClient} from "@/lib/firebase/firebase";
import {Globe} from "react-feather";
import dayjs from "dayjs";

const NotificationsList = ({}) => {
    const [props, setProps] = useState({
        lastUpdated: null
    })
    const [showNotifications, setShowNotifications] = useState(false)

    const {data: user} = useCurrentUser()

    const { data: notifications,  } = useNotificationsByUser(!!user, showNotifications,  props);
    const [newNotifications, setNewNotifications] = useState(false)


    const [updateValue, loading, error] = useDocumentData(doc(firestoreClient, `notifications/${user?.firebaseUuid}`), {
        snapshotListenOptions: { includeMetadataChanges: true } } )
    let isMobile = window?.matchMedia("(max-width: 600px)")?.matches;


    useEffect(() => {
        if ( updateValue?.lastUpdated > updateValue?.lastViewed  || (!updateValue?.lastViewed && updateValue?.lastUpdated ) ) {
            setNewNotifications(true)

        }
    }, [updateValue])
    useEffect(() => {

        if (props?.lastUpdated && updateValue?.lastUpdated && updateValue?.lastUpdated !== props.lastUpdated) {
            console.log(`should update`)

            setProps({
                ...props,
                force: !!props.lastUpdated,
                lastUpdated: updateValue?.lastUpdated,
            })
        }
    }, [updateValue, notifications])



    return (
        <>

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
                    notifications?.length > 0 ? (
                        <>
                            <div className={'notif-headers'}> Buddy Requests</div>
                            <List

                                itemLayout="horizontal"
                                dataSource={notifications}
                                renderItem={(item, index) => {
                                    const message = item?.type === NOTIFICATION_TYPES.FRIEND_REQUEST ? `You have a friend request from ${item?.body?.sender?.username}` : `You have been invited to join ${item?.group?.name} group`

                                    // const handleRespond = (response) => () => {
                                    //     return APIClient.api.patch(`/user/friends`, {
                                    //         requestId: item?.id,
                                    //         status: response,
                                    //     }).then(async () => {
                                    //         await client.refetchQueries({queryKey: ['friends', user?.id, 'PENDING']})
                                    //     })
                                    // }
                                    return (
                                        <List.Item>
                                            <FlexBox>
                                                <div style={{color: 'black'}} className={'buddy-name'}> {message}</div>
                                            </FlexBox>

                                            <FlexBox justify={'flex-end'} wrap={'no-wrap'} gap={6}>
                                                <Button className={'invite-accept-btn'}
                                                    // onClick={handleRespond('ACCEPTED')}
                                                        type={'primary'}>
                                                    Accept
                                                </Button>
                                                <Button
                                                    // onClick={handleRespond('DECLINED')}
                                                >
                                                    Decline
                                                </Button>
                                            </FlexBox>

                                        </List.Item>
                                    )
                                }}
                            />
                        </>
                    ) : (
                        <FlexBox style={{width: '100%' }} justify={'center'} className={'no-notifications'}>
                            No Notifications
                        </FlexBox>
                    )
                }

            </div>


        </>
    )
}

export default NotificationsList;
