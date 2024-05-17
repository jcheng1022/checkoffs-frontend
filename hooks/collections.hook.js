import {useQuery} from "@tanstack/react-query";
import {defaultQueryProps} from "@/app/providers";
import APIClient from "@/services/api";
import {COLLECTION_TYPES} from "@/constants";

export const useCollectionsByUserId = ( userId, type = COLLECTION_TYPES.USER, props = {})  => {

    const queryKey = ['collections', userId, props];

    return useQuery({
        queryKey,
        ...defaultQueryProps,
        enabled: !!userId,
        retry: 5,
        queryFn: () => APIClient.api.get(`/collections/user/${userId}`, { params: {
                type
            }})
    })

};
