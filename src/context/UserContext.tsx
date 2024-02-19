import {createContext, useContext} from "react"
import {User} from "./UserContextProvider.tsx";

export const userContext = createContext<{
    isLoggedIn: boolean
    setIsLoggedIn: (b: boolean) => void
    user: User
    refetchAfterLogin:  () => Promise<void>
} | null>(null)

export const useUser = () => {
    const context = useContext(userContext)
    if (context === null) {
        throw new Error("useUserContext must be used within a UserContextProvider.tsx")
    }
    return context
}