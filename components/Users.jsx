import { useContext } from "react"
import { UserPersonalDataContext } from "../store/UserPersonalDataContext"


export const Users = () => {
    const userPersonalDataContext = useContext(UserPersonalDataContext)
    console.log(userPersonalDataContext.users, 'userPersonalDataContext')

    return (<p>  </p>)
}