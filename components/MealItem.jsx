import { useContext } from "react"
import { CartContext } from '../store/CartContex'
import { Button } from "./UI/Button"
export const MealItem = (props) => {
    const { id, name, image, price, description } = props.mealitemmm

    const imageSrc = `http://localhost:3000/${image}`
    const cartContext = useContext(CartContext)

    const handleClick = () => {
        cartContext.addItems(props.mealitemmm)
    }

    return (
        <li className="meal-item">
            <article>
                <img src={imageSrc} />
                <div>
                    <h3> {name} </h3>
                    <p className="meal-item-price"> {price} </p>
                    <p className="meal-item-description"> {description} </p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleClick}> Add to cart </Button>
                </p>
            </article>
        </li>)
}