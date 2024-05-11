'use client';

import {useRef, useState} from "react";
import {
    KnockProvider,
    KnockFeedProvider,
    NotificationIconButton,
    NotificationFeedPopover,
    Avatar,
    ButtonGroup,
    Button,
    NotificationFeed,
    NotificationCell,
} from "@knocklabs/react";

// import {
//     ButtonGroup,
//     Button,
//     NotificationFeed,
//     NotificationCell,
// } from "@knocklabs/react";

// Required CSS import, unless you're overriding the styling
import "@knocklabs/react/dist/index.css";
import {useCurrentUser} from "@/hooks/user.hook";
import {FlexBox} from "@/components/core";
import {NOTIFICATION_TYPES, STATUS} from "@/constants";
import APIClient from "@/services/api";
import {notification} from "antd";
import {useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";

const KnockNotificationList = () => {
    const [isVisible, setIsVisible] = useState(false);
    const notifButtonRef = useRef(null);
    const {data: user} = useCurrentUser()
    const router = useRouter();
    const [respondedNotifications, setRespondedNotifications] = useState([]);

    const client = useQueryClient();


    const handleRespond = (type, item, response, data) => () => {
        if ( type === NOTIFICATION_TYPES.FRIEND_REQUEST ) {
            return APIClient.api.patch(`/user/friends`, {
                notificationId: item?.id,
                requestUserId: item?.data?.senderId,
                respondUserId: user.id,
                status: response,
                ...data
            }).then(async () => {
                notification.success({
                    message: `Friend request ${response.toLowerCase()}`,
                    placement:"bottomRight",
                    duration: 5
                })
                setRespondedNotifications([
                    ...respondedNotifications,
                    item.id
                ])
                // await client.refetchQueries({queryKey: ['notifications', props]})
            }).catch(e => {
                notification.error({
                    message: 'Error',
                    description: e?.message
                })
            })

        } else if ( type === NOTIFICATION_TYPES.GROUP_INVITE ) {
            return APIClient.api.patch(`/collections/${item?.data?.groupId}/invite`, {
                notificationId: item?.id,
                userId: user?.id,
                status: response,
            }).then(async () => {
                notification.success({
                    message: `Group invite ${response.toLowerCase()}`,
                    duration: 5,
                    placement:"bottomRight"
                })
                setRespondedNotifications([
                    ...respondedNotifications,
                    item.id
                ])
                // await client.refetchQueries({queryKey: ['notifications', props]})
            }).catch(e => {
                notification.error({
                    message: 'Error',
                    description: e?.message
                })
            })

        }
    }

    return (
        <KnockProvider userToken={user?.knockToken} apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY} userId={user?.firebaseUuid}>
            <KnockFeedProvider colorMode="dark"  feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_ID} >
                <div>
                    <NotificationIconButton
                        ref={notifButtonRef}
                        badgeCountType="unseen"
                        onClick={(e) => setIsVisible(!isVisible)}
                    />
                    <NotificationFeedPopover
                        buttonRef={notifButtonRef}
                        isVisible={isVisible}
                        renderItem={({ item, ...props }) => {
                            return (
                                <NotificationCell
                                    {...props}
                                    onItemClick={() => {
                                        console.log(`clicked`)
                                        console.log(item, props)
                                        if (item?.source?.key === 'new-group-goal') {
                                            router.push(`/group/${item?.data?.goal?.group?.id}/goal/${item?.data?.goal.id}`)
                                        }
                                    }
                                    }
                                    item={item}
                                    // You can use any properties available on the `actor` for the name and avatar
                                    avatar={item?.actors.length > 0 ?<Avatar name={item.actors[0].name} src={item.actors[0].avatar} /> : null}
                                >
                                    {(item?.source?.key === 'new-friend-request' && !respondedNotifications.find(o => o === item.id)) && (
                                       <FlexBox gap={12}>
                                           <Button variant={'primary'} onClick={handleRespond(NOTIFICATION_TYPES.FRIEND_REQUEST, item, STATUS.ACCEPTED, { notificationId: item.id})}>
                                               Accept
                                           </Button>
                                           <Button variant={'secondary'} onClick={handleRespond(NOTIFICATION_TYPES.FRIEND_REQUEST, item, STATUS.DECLINED, { notificationId: item.id})}>
                                               Decline
                                           </Button>
                                       </FlexBox>
                                    )}

                                    {(item?.source?.key === 'new-group-invite' && !respondedNotifications.find(o => o === item.id)) && (
                                        <FlexBox gap={12}>
                                            <Button variant={'primary'} onClick={handleRespond(NOTIFICATION_TYPES.GROUP_INVITE, item, STATUS.ACCEPTED, { notificationId: item.id})}>
                                                Accept
                                            </Button>
                                            <Button variant={'secondary'} onClick={handleRespond(NOTIFICATION_TYPES.GROUP_INVITE, item, STATUS.DECLINED, { notificationId: item.id})}>
                                                Decline
                                            </Button>
                                        </FlexBox>
                                    )}
                                </NotificationCell>
                            )
                        }}
                        onClose={() => setIsVisible(false)}
                    />

                </div>
            </KnockFeedProvider>
        </KnockProvider>
    );
};

export default KnockNotificationList;
