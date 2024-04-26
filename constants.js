export const PRIVACY_OPTIONS = {
    ALL: 'ALL',
    FRIENDS: 'FRIENDS',
    PRIVATE: 'PRIVATE'
}

export const DEFAULT_FEED_INCREMENTS = 10


export const NOTIFICATION_TYPES = {
    FRIEND_REQUEST: 'FRIEND_REQUEST',
    GROUP_INVITE: 'GROUP_INVITE',
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
