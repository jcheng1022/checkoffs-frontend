import {useQuery} from "@tanstack/react-query";
import {defaultQueryProps} from "@/app/providers";
import APIClient from "@/services/api";

export const useGroupById = ( groupId, props = {})  => {

    const queryKey = ['group', groupId];

    return useQuery({
        queryKey,
        ...defaultQueryProps,
        retry: 5,
        queryFn: () => APIClient.api.get(`/collections/${groupId}`, { params: props})
    })

};

export const useGroupMembers = ( groupId, props = {})  => {

    const queryKey = ['group-members', groupId];

    return useQuery({
        queryKey,
        ...defaultQueryProps,
        retry: 5,
        queryFn: () => APIClient.api.get(`/collections/${groupId}/members`, { params: props})
    })

};

export const useGroupFeed = ( isLoggedIn, groupId, props = {})  => {

    const queryKey = ['group-feed', groupId];

    return useQuery({
        queryKey,
        ...defaultQueryProps,
        enabled: !!isLoggedIn,
        retry: 5,
        queryFn: () => APIClient.api.get(`/collections/${groupId}/feed`, { params: props})
    })

};

export const useGroupGoals = (  groupId,  props = {})  => {

    const queryKey = ['group-goals', groupId, props]
    return useQuery({
        queryKey,
        ...defaultQueryProps,
        enabled: !!groupId ,
        retry: 5,
        queryFn: () => APIClient.api.get(`/collections/${groupId}/goals`, { params: props})
    })

};

export const useGroupGoalById = (  groupId, goalId,  props = {})  => {

    const queryKey = ['group-goal', groupId, goalId];

    return useQuery({
        queryKey,
        ...defaultQueryProps,
        enabled: !!groupId && !!goalId,
        retry: 5,
        queryFn: () => APIClient.api.get(`/collections/${groupId}/goals/${goalId}`, { params: props})
    })

};

export const useViewGroupPermission = (isLoggedIn,  groupId, type = 'VIEW_PAGE', props = {})  => {

    const queryKey = ['group', 'permission', groupId, type];

    return useQuery({
        queryKey,
        ...defaultQueryProps,
        enabled:  !!isLoggedIn ,
        retry: 5,
        queryFn: () => APIClient.api.get(`/collections/${groupId}/permissions`, { params: {
            ...props,
                type
            }})
    })

};


