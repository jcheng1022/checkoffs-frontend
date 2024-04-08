import APIClient from '../services/api'
// import {useQuery} from "react-query";
import {useQuery} from '@tanstack/react-query'
import {defaultQueryProps} from "@/app/providers";
import {auth} from "@/lib/firebase/firebase";
import {onAuthStateChanged} from "firebase/auth";
import {useState} from "react";

export const useCurrentUser = ( props = {})  => {


    const [isLoggedIn, setIsLoggedIn] = useState(false)
    // const session = getCookie('session')
    //
    // console.log(`session`, session)
    //
    // if (session) {
    //     return session;
    // }


    const queryKey = ['currentUser'];
    // console.log(auth.currentUser, 'user')
    // const uid = auth.currentUser?.uid
    // console.log(uid, 'uid')

    // let isLoggedIn;
    onAuthStateChanged(auth,  (user) => {
        if (user) {
            console.log(user?.uid)
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
export const useUserMenuData = (user,  props = {})  => {

    const queryKey = ['menu'];

    return useQuery({
        queryKey,
        ...defaultQueryProps,
        enabled: !!user,
        queryFn: () => APIClient.api.get(`/test`, { params: props})
    })


}
