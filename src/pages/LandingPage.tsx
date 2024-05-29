import {useUser} from "../context/UserContext.tsx";

export default function LandingPage() {
    const user = useUser()

    return (
       <div>
           {user.user.name}
       </div>
    )
}