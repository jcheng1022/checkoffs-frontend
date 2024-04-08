'use client'

// import {getAuth, onAuthStateChanged,} from 'firebase/auth';
import {createContext, useContext, useState} from "react";
import {auth} from "@/lib/firebase/firebase";
// import {firebaseApp} from "@/lib/firebase/firebase";
// import {useCurrentUser} from "@/hooks/user.hook";

// const auth = getAuth(firebaseApp);

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);


export const AuthContextProvider = ({
                                        children,
                                    }) => {

    const [loading, setLoading] = useState(true);

    const logOut = async () => {
        await auth.signOut()

        // await fetch(`/api/auth/logout`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //
        //         // Authorization: `Bearer ${await auth.currentUser.getIdToken()}`,
        //     },
        // })
        // await auth.signOut()
        return window.location.href = window.location.href
        // return window.location.reload()
        }

    //
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             setUser(user);
    //         } else {
    //             setUser(null);
    //         }
    //         setLoading(false);
    //     });
    //
    //     return () => unsubscribe();
    // }, []);

    const settings = {
        // user: currentUser,
        logOut,
        initializingAuth: loading
    }
    return (
        <AuthContext.Provider value={settings}>

            {children}
        </AuthContext.Provider>
    );
};
