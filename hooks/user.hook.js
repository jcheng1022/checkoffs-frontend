import APIClient from '../services/api'
// import {useQuery} from "react-query";
import {useQuery} from '@tanstack/react-query'
import {defaultQueryProps} from "@/app/providers";
import {auth} from "@/lib/firebase/firebase";
import {onAuthStateChanged} from "firebase/auth";
import {useState} from "react";


export const useUserIsLoggedIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    onAuthStateChanged(auth,  (user) => {
        if (user) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }})

    return isLoggedIn
}
export const useCurrentUser = ( props = {})  => {


    const [isLoggedIn, setIsLoggedIn] = useState(false)



    const queryKey = ['currentUser', props];
    // console.log(auth.currentUser, 'user')
    // const uid = auth.currentUser?.uid
    // console.log(uid, 'uid')

    // let isLoggedIn;
    onAuthStateChanged(auth,  (user) => {
        if (user) {
            setIsLoggedIn(true)
        } else {
            return;
        }})
    return useQuery({
        queryKey,
        ...defaultQueryProps,
        enabled: !!isLoggedIn,
        retry: 5,
        queryFn: () => APIClient.api.get(`/user/me`, { params: props})
    })


}

export const useUserFriends = ( userId = null, type = 'ACCEPTED', props)  => {

    const queryKey = ['friends', userId, type, props];

    return useQuery({
        queryKey,
        ...defaultQueryProps,
        enabled: !!userId,
        retry: 5,
        queryFn: () => APIClient.api.get(`/user/friends`, { params: {
                status: type,
                ...props
            }})
    })

};

export const useUserPrivacy = ( isLoggedIn, userId, props = {})  => {

    const queryKey = ['user', userId, 'privacy'];

    return useQuery({
        queryKey,
        ...defaultQueryProps,
        enabled: !!isLoggedIn,
        retry: 5,
        queryFn: () => APIClient.api.get(`/user/${userId}/privacy`, { params: props})
    })

};

export const useUserMenuData = (user,  props = {})  => {

    const queryKey = ['menu'];

    return useQuery({
        queryKey,
        ...defaultQueryProps,
        enabled: !!user,
        queryFn: () => APIClient.api.get(`/test`, { params: props})
    })


}

export const usePeopleSearch = (userId,   props = {})  => {

    const queryKey = ['search'];

    return useQuery({
        queryKey,
        ...defaultQueryProps,
        enabled: !!userId,
        queryFn: () => APIClient.api.post(`/user/find`, {})
    })


}
