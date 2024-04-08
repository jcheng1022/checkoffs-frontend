'use client'

import {createContext, useEffect, useState} from "react";
import FinishUserInfoModal from "@/components/modals/FinishUserInfoModal";
import {useCurrentUser} from "@/hooks/user.hook";


export const AppContext = createContext({});

// export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({
                                        children,
                                    }) => {
    const [userModal, setUserModal] = useState(false)
    const {data: user} = useCurrentUser();

    // const {user} = useAuthContext();

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
