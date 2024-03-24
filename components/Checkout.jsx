import { useContext, useEffect, useState } from "react"
import { UseInput } from "../hooks/useInput.jsx"
import { CartContext } from "../store/CartContex.jsx"
import { UserProgressContext } from "../store/UserProgressContext"
import { Button } from "./UI/Button.jsx"
import { Input } from "./UI/Input.jsx"
import { Modal } from "./UI/Modal"
import { CartItem } from "./CartItem.jsx"


export const Checkout = () => {
    const userProgressContext = useContext(UserProgressContext)
    const cartContext = useContext(CartContext)
    const { totalCartPrice, items, showFreePizza } = cartContext

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const customerData = Object.fromEntries(formData.entries())

        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order: {
                    items: items,
                    customer: customerData
                }
            })
        })

        resetName()
        resetLastName()
        resetEmailProps()
        resetStreetProps()
        resetPostalCodeProps()
        resetCityProps()

        cartContext.emptyCart()

        handleClose()
    }

    const handleClose = () => {
        userProgressContext.hideCheckout()
    }

    const [nameProps, resetName] = UseInput()
    const [lastNameProps, resetLastName] = UseInput()
    const [emailProps, resetEmailProps] = UseInput()
    const [streetProps, resetStreetProps] = UseInput()
    const [postalCodeProps, resetPostalCodeProps] = UseInput()
    const [cityProps, resetCityProps] = UseInput()



    return (
        <Modal open={userProgressContext.userProgress === 'checkout'} handleClose={handleClose}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="button" onClick={handleClose}> X </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h2>
                    Checkout
                </h2>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div> <p> Items details ***</p>
                    <ul className="checkout-item-details">
                        {cartContext.items.map((item) => <CartItem
                            key={item.id}
                            {...item}
                        />)}
                        {showFreePizza && <li> Free Pizza  </li>}
                    </ul>
                    <p style={{ fontWeight: 'bold' }}> Total Amount: {totalCartPrice} </p>
                </div>

                <div className="personal-data-checkout-section">
                    <p> Personal Data </p>
                    <form onSubmit={handleSubmit} id="userDataForm">
                        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '210px' }}>
                            <Input label="Name: " type="text" id="name"  {...nameProps} />
                            <Input label="Lastname: " type="text" id="lastname"  {...lastNameProps} />
                            <Input label="Email: " type="email" id="email"  {...emailProps} />
                            <Input label="Street: " type="text" id="street"  {...streetProps} />
                            <Input label="Postal code: " type="text" id="postal-code" {...postalCodeProps} />
                            <Input label="City: " type="text" id="city" {...cityProps} />

                            <p className="modal-actions">
                                <Button> Submit </Button>
                            </p>
                        </div>
                    </form>
                </div>

            </div>

        </Modal >
    )
}