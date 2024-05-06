export const PRIVACY_OPTIONS = {
    ALL: 'ALL',
    FRIENDS: 'FRIENDS',
    PRIVATE: 'PRIVATE'
}

export const DEFAULT_FEED_INCREMENTS = 10

export const TIME_PERIOD = {
    HOUR: 'hour',
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month'
}

export const NOTIFICATION_TYPES = {
    FRIEND_REQUEST: 'FRIEND_REQUEST',
    GROUP_INVITE: 'GROUP_INVITE',
    NEW_COLLECTIONS_POST: 'NEW_COLLECTIONS_POST',
    NEW_GOAL_POST: 'NEW_GOAL_POST',
}

export const ROLES = {
    ADMIN: 'ADMIN',
    MEMBER: 'MEMBER',
    OWNER: 'OWNER'
}
export const STATUS = {
    PENDING: 'PENDING',
    ACCEPTED: 'ACCEPTED',
    DECLINED: 'DECLINED',

}

export const getTagColorByRole = (role) => {
    switch (role) {
        case ROLES.ADMIN:
            return {
                backgroundColor: '#f50',
                color: 'black'
            }
        case ROLES.MEMBER:
            return {
                backgroundColor: '#87d068',
                color: 'black'
            }
        case ROLES.OWNER:
            return {
                backgroundColor: '#108ee9',
                color: 'black'
            }
    }
}

export const RESOURCE_TYPES = {
    COLLECTION: 'COLLECTION',
    GOAL: 'GOAL',
    GROUP_GOAL: 'GROUP_GOAL',
    ALL: 'ALL'
}

