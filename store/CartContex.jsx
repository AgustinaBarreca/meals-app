import { createContext, useEffect, useReducer, useState } from "react";

export const CartContext = createContext({
    items: [],
    addItems: () => { },
    removeItems: () => { }
})

const cartContextReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id)
        const updatedItems = [...state.items]
        if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex]
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }
            updatedItems[existingCartItemIndex] = updatedItem

        } else {
            updatedItems.push({ ...action.item, quantity: 1 })
        }
        return { ...state, items: updatedItems }
    }

    if (action.type === 'REMOVE_ITEM') {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id)
        const updatedItems = [...state.items]
        const existingItem = { ...state.items[existingCartItemIndex] }
        if (existingItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1)
        } else {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity - 1
            }
            updatedItems[existingCartItemIndex] = updatedItem
        }
        return { ...state, items: updatedItems }
    }
}
export const CartContextProvider = ({ children }) => {
    const [carts, dispatchAction] = useReducer(cartContextReducer, { items: [] })
    const [totalCartPrice, setTotalCartPrice] = useState()

    const addItems = (item) => {
        dispatchAction({ type: 'ADD_ITEM', item })
    }

    const removeItems = (id) => {
        dispatchAction({ type: 'REMOVE_ITEM', id })
    }

    const cartContext = {
        items: carts.items,
        addItems,
        removeItems,
        totalCartPrice,
        setTotalCartPrice
    }

    return (<CartContext.Provider value={cartContext}> {children} </CartContext.Provider>)
}