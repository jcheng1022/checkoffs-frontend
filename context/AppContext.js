'use client'

import {getAuth, onAuthStateChanged,} from 'firebase/auth';
import {createContext, useContext, useEffect, useState} from "react";
import {firebaseApp} from "@/lib/firebase/firebase";
import {useCurrentUser} from "@/hooks/user.hook";
import FinishUserInfoModal from "@/components/modals/FinishUserInfoModal";
import {useAuthContext} from "@/context/AuthContext";

const auth = getAuth(firebaseApp);

export const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({
                                        children,
                                    }) => {
    const [userModal, setUserModal] = useState(false)

    const {user} = useAuthContext();

    useEffect(() => {
        if (user && !user?.username) {
            setUserModal(true)
        }
    }, [user])

    const settings = {

    }
    return (
        <AppContext.Provider value={settings}>

            {children}
            { userModal && <FinishUserInfoModal open={userModal} onCancel={() => setUserModal(false)} />}
        </AppContext.Provider>
    );
};
