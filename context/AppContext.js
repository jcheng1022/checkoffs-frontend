'use client'

import {createContext, useContext, useEffect, useState} from "react";
import FinishUserInfoModal from "@/components/modals/FinishUserInfoModal";
import {useCurrentUser} from "@/hooks/user.hook";
import Knock from "@knocklabs/client";

import {getDatabase, onDisconnect, onValue, ref, set} from "firebase/database";
import dayjs from "dayjs";
import UserSettingsModal from "@/components/modals/UserSettingsModal";
import InitialCreateActivityModal from "@/components/modals/creatingActivity/InitialCreateActivityModal";

const knockClient = new Knock(process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY);


export const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({
                                        children,
                                    }) => {
    const [userModal, setUserModal] = useState(false)
    const {data: user} = useCurrentUser();
    const [notifications, setNotifications] = useState([])
    const [openUserSettings, setOpenUserSettings] = useState(false)
    const [creatingNewActivity, setCreatingNewActivity] = useState(false)

    // const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)

    // const {user} = useAuthContext();

    useEffect(() => {
        if (user?.firebaseUuid && user?.knockToken) {
            knockClient.authenticate(user?.firebaseUuid, user?.knockToken)
        }

        if (user && !user?.username) {
            setUserModal(true)
        }

        const userStatusPath = `/user/${user?.firebaseUuid}/status`
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
        // mobileMenuIsOpen,
        // setMobileMenuIsOpen,
        openUserSettings,
        setOpenUserSettings,
        creatingNewActivity,
        setCreatingNewActivity,
        notifications,
        setNotifications

    }
    return (
        <AppContext.Provider value={settings}>

            {children}
            { userModal && <FinishUserInfoModal open={userModal} onCancel={() => setUserModal(false)} />}
            { openUserSettings && <UserSettingsModal open={openUserSettings} onCancel={() => setOpenUserSettings(false)}/>}
            {!!creatingNewActivity && <InitialCreateActivityModal open={creatingNewActivity} onCancel={() => setCreatingNewActivity(false)}/> }

        </AppContext.Provider>
    );
};
