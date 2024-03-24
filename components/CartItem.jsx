import { CartContext } from "../store/CartContex"
import { useContext } from "react"
export const CartItem = ({
    id,
    name,
    quantity,
    price,
    discountPricePercentage,
    handleDecreaseItem,
    handleIncreaseItem,
    getFreePizza
}) => {
    // make component leaner: 
    // const cartContext = useContext(CartContext)
    // const item = { id, name, quantity, price }
    // const handleDecreaseItem = () => {
    //     cartContext.removeItems(id)
    // }

    // const handleIncreaseItem = () => {
    //     cartContext.addItems(item)
    // }

    const discountPriceStyle = {
        marginRight: '5px', textDecoration: 'line-through', color: 'red'
    }

    const regularPriceStyle = {
        marginRight: '5px'
    }

    const totalUnitPrice = price * quantity
    const totalUnitPriceFormatted = totalUnitPrice.toFixed(2)

    const calculateDiscountPrice = () => {
        const discountPrice = discountPricePercentage / 100 * price
        const discountPriceFormatted = discountPrice.toFixed(2)
        const discountPriceDiff = price - discountPriceFormatted
        const discountPriceDiffFormatted = discountPriceDiff.toFixed(2)
        return [discountPriceFormatted, discountPriceDiffFormatted]
    }

    const [discountPriceFormatted, discountPriceDiffFormatted] = calculateDiscountPrice()

    return <li className='cart-item'>
        <div>
            <span style={{ marginRight: '5px' }}>
                {name} -
            </span>
            <span style={{ marginRight: '5px' }}>
                {quantity} x
            </span>

            <span style={getFreePizza ? discountPriceStyle : regularPriceStyle}>
                {price}
            </span>

            {getFreePizza && <span style={{
                marginRight: '5px',
                fontWeight: 'bold'
            }}>
                {discountPriceDiffFormatted}
            </span>}

            {<span style={{
                marginRight: '5px',
                fontWeight: 'bold'
            }}>
                = {totalUnitPriceFormatted}
            </span>}

            {getFreePizza &&
                <CartItemDiscount discountPriceFormatted={discountPriceFormatted} />
            }
        </div>
        <p className="cart-item-actions">
            <button onClick={handleDecreaseItem}> - </button>
            <span> QTY </span>
            <button onClick={handleIncreaseItem}> + </button>
        </p>
    </li >
}

const CartItemDiscount = (props) => {
    return (
        <>
            <span style={{ marginRight: '5px', fontSize: '12px', display: 'flex', fontStyle: 'italic' }}>
                Descuento por premio por unidad = $ {props.discountPriceFormatted}
            </span>
        </>
    )
}