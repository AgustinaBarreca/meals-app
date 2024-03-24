import { useContext } from "react"
import { CartContext } from "../store/CartContex"
import { UserProgressContext } from "../store/UserProgressContext"
import { Button } from "./UI/Button"

export const Header = () => {
    const cartContext = useContext(CartContext)
    const userProgressContext = useContext(UserProgressContext)

    const items = cartContext.items
    const totalItems = items.reduce((totalAmount, item) => totalAmount + item.quantity, 0)

    const handleClick = () => {
        userProgressContext.showCart()
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src="/src/assets/logo.jpg" />
                <h1> React Food App </h1>
            </div>
            <nav>
                <Button onClick={handleClick}> Cart ({totalItems}) </Button>
            </nav>
        </header>
    )
}
