'use client'

import {createContext, useContext, useEffect, useState} from "react";
import FinishUserInfoModal from "@/components/modals/FinishUserInfoModal";
import {useCurrentUser} from "@/hooks/user.hook";

import {getDatabase, onDisconnect, onValue, ref, set} from "firebase/database";
import dayjs from "dayjs";


export const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({
                                        children,
                                    }) => {
    const [userModal, setUserModal] = useState(false)
    const {data: user} = useCurrentUser();

    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)

    // const {user} = useAuthContext();

    useEffect(() => {
        if (user && !user?.username) {
            setUserModal(true)
        }
        const userStatusPath = `/user/${user?.id}/status`

        const rtdbConnect = () => {

            if (!user?.id) return;// [START rtdb_presence]
                // Fetch the current user's ID from Firebase Authentication.
                // const uid = auth.currentUser.uid;

                // Create a reference to this user's specific status node.
                // This is where we will store data about being online/offline.
            const db  = getDatabase();

                const isOfflineForDatabase = {
                    state: 'offline',
                    last_changed: dayjs().format(),
                };

                const isOnlineForDatabase = {
                    state: 'online',
                    last_changed: dayjs().format(),
                };

            onValue(ref(db, userStatusPath), snapshot => {
                if (snapshot.val() == false) {
                    return;
                };


                const statusRef = ref(db, userStatusPath)
                onDisconnect(statusRef).set(isOfflineForDatabase).then(function() {

                    set(statusRef, isOnlineForDatabase);
            } )

            })}

        rtdbConnect()


        // })
    }, [user])



    const settings = {
        mobileMenuIsOpen,
        setMobileMenuIsOpen,

    }
    return (
        <AppContext.Provider value={settings}>

            {children}
            { userModal && <FinishUserInfoModal open={userModal} onCancel={() => setUserModal(false)} />}
        </AppContext.Provider>
    );
};
