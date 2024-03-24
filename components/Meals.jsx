import { useEffect, useState } from 'react'
import { MealItem } from './MealItem.jsx'
const initialState = []
export const Meals = () => {
    const [meals, setMeals] = useState(initialState)

    useEffect(() => {
        const fetchMeals = async () => {
            const meals2 = await fetch('http://localhost:3000/meals').then(res => res.json())
            setMeals(meals2)
        }
        fetchMeals()
    }, [])

    return (
        <>
            <ul id="meals">
                {
                    meals && meals.map((mealitemmm) => (<MealItem key={mealitemmm.id} mealitemmm={mealitemmm} />))
                }
            </ul>
        </>
    )
}
