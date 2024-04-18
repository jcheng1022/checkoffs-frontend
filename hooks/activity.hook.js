import {useMutation, useQuery} from "@tanstack/react-query";
import {defaultQueryProps} from "@/app/providers";
import APIClient from "@/services/api";

export const useActivitiesByUser = (isLoggedIn,  props = {})  => {

    const queryKey = ['activities', props];

    return useQuery({
        queryKey,
        ...defaultQueryProps,
        enabled: !!isLoggedIn,
        queryFn: () => APIClient.api.get(`/activity`, { params: props})
    })


}
export const useActivitiesStatsByUser = (userId,  props = {})  => {

    const queryKey = ['stats', userId, props];

    return useQuery({
        queryKey,
        ...defaultQueryProps,
        enabled: !!userId,
        queryFn: () => APIClient.api.get(`/activity/stats`, { params: props})
    })


}

export const useActivityFeed = (userId,  props = {})  => {

    const queryKey = ['feed', userId, props];

    return useQuery({
        queryKey,
        ...defaultQueryProps,
        enabled: !!userId,
        queryFn: () => APIClient.api.get(`/activity/feed`, { params: props})
    })


}

export const useActivityActionMutation = (activityId) => {
    return useMutation({
        mutationFn: ({type, message}) => APIClient.api.post(`/activity/${activityId}/action`, {message}, {
            params: {
                type
            }
        })
    })
}
