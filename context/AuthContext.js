'use client'

import {getAuth, onAuthStateChanged,} from 'firebase/auth';
import {createContext, useContext, useEffect, useState} from "react";
import {firebaseApp} from "@/lib/firebase/firebase";
import {useCurrentUser} from "@/hooks/user.hook";

const auth = getAuth(firebaseApp);

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({
                                        children,
                                    }) => {
    const [user, setUser] = useState(null);
    const  {data : currentUser } = useCurrentUser()

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const settings = {
        user: currentUser,
        initializingAuth: loading
    }
    return (
        <AuthContext.Provider value={settings}>

            {children}
        </AuthContext.Provider>
    );
};
