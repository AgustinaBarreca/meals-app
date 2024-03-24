import { createContext, useState } from "react";

export const UserProgressContext = createContext()

export const UserProgressContextProvider = ({ children }) => {
    const [userProgress, setUserProgress] = useState('')

    const showCart = () => {
        setUserProgress('cart')
    }

    const hideCart = () => {
        setUserProgress('')
    }

    const showCheckout = () => {
        setUserProgress('checkout')
    }

    const hideCheckout = () => {
        setUserProgress('')
    }

    const userProgressContext = {
        userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }

    return (<UserProgressContext.Provider value={userProgressContext}>
        {children}
    </UserProgressContext.Provider>)
}