import { Modal } from "./UI/Modal"
import { CartContext } from "../store/CartContex.jsx"
import { useContext, useState, useEffect } from "react"
import { Button } from "./UI/Button"
import { UserProgressContext } from "../store/UserProgressContext"
import { CartItem } from "./CartItem"

export const Cart = () => {
    const cartContext = useContext(CartContext)
    const { totalCartPrice, setTotalCartPrice, setShowFreePizza } = cartContext

    const userProgressContext = useContext(UserProgressContext)
    const [getFreePizza, setGetFreePizza] = useState(false)
    const [discountPricePercentage, setDiscountPricePercentage] = useState(0)

    const cartTotal = cartContext.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0)
    const cartTotalFormatted = cartTotal.toFixed(2)
    setTotalCartPrice(cartTotalFormatted)

    const minimumAmountToGetFreePizza = 55
    const freePizzaPrice = 9

    const handleClose = () => {
        userProgressContext.hideCart()
    }

    const toCheckout = () => {
        userProgressContext.showCheckout()
    }

    const handleDecreaseItem = (id) => {
        cartContext.removeItems(id)
    }

    const handleIncreaseItem = (item) => {
        cartContext.addItems(item)
    }

    const calculateDiscountPricePercentage = (totalCartPrice) => {
        const discountPricePercentagevar = 100 / totalCartPrice * 9
        setDiscountPricePercentage(discountPricePercentagevar)
    }

    useEffect(() => {
        const handleFreePizza = () => {
            if (totalCartPrice >= minimumAmountToGetFreePizza) {
                setGetFreePizza(true)
                setShowFreePizza(true)
                calculateDiscountPricePercentage(totalCartPrice)
            } else {
                setGetFreePizza(false)
                setShowFreePizza(false)
            }
        }
        handleFreePizza()
    }, [totalCartPrice])

    return (
        <Modal className="cart" open={userProgressContext.userProgress === 'cart'} onClose={userProgressContext.userProgress === 'cart' ? handleClose : null}>
            {cartContext && cartContext?.items.length > 0 ? <>
                <h2> Your cart </h2>
                <ul>
                    {cartContext.items.map((item) => <CartItem
                        key={item.id}
                        {...item}
                        handleIncreaseItem={() => { handleIncreaseItem(item) }}
                        handleDecreaseItem={() => { handleDecreaseItem(item.id) }}
                        getFreePizza={getFreePizza}
                        discountPricePercentage={discountPricePercentage}
                        showQuantityControls={true}
                    />)}
                </ul>
                <p className="cart-total"> {totalCartPrice} </p>
                <ul>
                    {getFreePizza ? <li>
                        <p style={{ color: 'green', marginBottom: '10px' }}> Felicitaciones! Te llevás una pizza gratis de $ {freePizzaPrice} </p>
                        <p style={{ fontSize: '10px' }}> * El monto del regalo se deducirá proporcionalmente entre los productos que compraste </p>
                    </li>
                        : <li>
                            <p style={{ color: 'red', marginBottom: '10px' }}> Si tu compra supera los $ {minimumAmountToGetFreePizza}, te llevas una pizza gratis de $ {freePizzaPrice} </p>
                            <p style={{ fontSize: '10px' }}> * El monto del regalo se deducirá proporcionalmente entre los productos que compraste </p>
                        </li>
                    }
                </ul>
            </> : <h2> Your cart is empty! </h2>}
            <p className="modal-actions">
                <Button textOnly onClick={handleClose}> Close </Button>

                {Boolean(cartContext.items.length) && <Button onClick={toCheckout}> Go to checkout </Button>}
            </p>
        </Modal>
    )
}