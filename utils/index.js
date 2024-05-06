import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration'
import {RESOURCE_TYPES} from "@/constants";

dayjs.extend(duration)

export const extractGroupAndGoalId = (inputString) => {
    const parts = inputString.split('&');
    let collectionId = null;
    let goalId = null;

    for (let i = 0; i < parts.length; i++) {
        const keyValue = parts[i].split('=');
        if (keyValue.length === 2) {
            if (keyValue[0] === RESOURCE_TYPES.COLLECTION.toLowerCase()) {
                collectionId = keyValue[1];
            } else if (keyValue[0] === RESOURCE_TYPES.GOAL.toLowerCase()) {
                goalId = keyValue[1];
            }
        }
    }

    if (collectionId !== null && goalId !== null) {
        return { type: RESOURCE_TYPES.GROUP_GOAL, collectionId, goalId: goalId };
    } else if (inputString.toLowerCase() === RESOURCE_TYPES.ALL.toLowerCase()) {
        return { type: RESOURCE_TYPES.ALL };
    } else if (collectionId !== null && goalId === null) {
        return { type: RESOURCE_TYPES.COLLECTION, collectionId, goalId: null };
    } else {
        return { groupId: null, goalId: null };
    }
}

export const getCountdown = (ending, props = {}) => {
    const {  } = props
    const now = dayjs()
    const end = dayjs(ending) // another date
    const duration = dayjs.duration(end.diff(now))

    //Get Days and subtract from duration
    let days = duration.days()
    duration.subtract(days, 'days')

    //Get hours and subtract from duration
    let hours = duration.hours()
    duration.subtract(hours, 'hours')

    //Get Minutes and subtract from duration
    let minutes = duration.minutes()
    duration.subtract(minutes, 'minutes')

    //Get seconds
    let seconds = duration.seconds()

    if (days < 0) {
        days = 0
    }

    if (hours < 0) {
        hours = 0
    }

    if (minutes < 0) {
        minutes = 0
    }

    if (seconds < 0) {
        seconds = 0
    }

    let isZero = seconds === 0 && minutes === 0 && hours === 0 && days === 0;

    return {
        days, hours, minutes, seconds, isZero
    }
}
