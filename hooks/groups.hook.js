import {useQuery} from "@tanstack/react-query";
import {defaultQueryProps} from "@/app/providers";
import APIClient from "@/services/api";

export const useGroupById = ( groupId, props = {})  => {

    const queryKey = ['group', groupId];

    return useQuery({
        queryKey,
        ...defaultQueryProps,
        // enabled: !!isLoggedIn,
        retry: 5,
        queryFn: () => APIClient.api.get(`/groups/${groupId}`, { params: props})
    })

};

export const useGroupMembers = ( groupId, props = {})  => {

    const queryKey = ['group-members', groupId];

    return useQuery({
        queryKey,
        ...defaultQueryProps,
        // enabled: !!isLoggedIn,
        retry: 5,
        queryFn: () => APIClient.api.get(`/groups/${groupId}/members`, { params: props})
    })

};
