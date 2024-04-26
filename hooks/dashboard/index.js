import {useQuery} from "@tanstack/react-query";
import {defaultQueryProps} from "@/app/providers";
import APIClient from "@/services/api";

export const useDashboardGroupMembers = ( groupId, props = {})  => {

    const queryKey = ['group-members', 'dashboard', groupId, props];

    return useQuery({
        queryKey,
        ...defaultQueryProps,
        // enabled: !!isLoggedIn,
        retry: 5,
        queryFn: () => APIClient.api.get(`/groups/${groupId}/dashboard/MEMBERS`, { params: props})
    })

};
