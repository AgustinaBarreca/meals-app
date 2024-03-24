import { createContext, useContext, useReducer } from "react";

export const UserPersonalDataContext = createContext({
    users: [{
        name: 'first user name',
        lastname: 'first user lastname',
        email: 'firstuser@gmail.com'
    }],
    addUser: () => { }
})


const userPersonalDataReducer = (state, action) => {
    const usersUpdated = [...state]
    if (action.type === "ADD_USER") {
        const [{ id: lastUserId }] = [...state].reverse()
        usersUpdated.push({ ...action.user, lastUserId: lastUserId + 1 })
    }
    return {
        ...state,
        users: usersUpdated
    }
}
export const UserPersonalDataContextProvider = ({ children }) => {
    const firstUser = {
        name: 'first user name',
        lastname: 'first user lastname',
        email: 'firstuser@gmail.com'
    }

    const [users, dispatch] = useReducer(userPersonalDataReducer, firstUser)

    const addUser = (user) => {
        dispatch({ type: 'ADD_USER', user })
    }
    const userPersonalDataContext = {
        users: [users],
        addUser
    }

    return (<UserPersonalDataContext.Provider value={userPersonalDataContext}>{children}</UserPersonalDataContext.Provider>)
}