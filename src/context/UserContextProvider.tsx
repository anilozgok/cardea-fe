import {useEffect, useState} from "react"

import {userContext} from "./UserContext.tsx"
import axios from "axios";


export type User = {
    role: string;
    name: string
    email: string
    id: string
}

export function UserContextProvider(props: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<User>({} as User)

    async function me() {
        const res = await axios.get("http://localhost:8080/api/v1/user/me", {withCredentials: true})

        if (res.status === 200) {
            setIsLoggedIn(true)
            setUser(res.data)
        }
    }


    useEffect(() => {
        me()
    }, []);

    async function refetchAfterLogin() {
        setIsLoggedIn(true)
        await me()
    }

    return (
        <userContext.Provider value={{isLoggedIn, setIsLoggedIn, user, refetchAfterLogin}}{...props} />
    )
}