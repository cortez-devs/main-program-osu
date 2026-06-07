import { useParams, useNavigate } from 'react-router-dom';
import {useEffect, useState } from 'react';
import { getMeals, deleteMeal } from '../services/api/mealService';
import "./MealView.css"

export default function Mealview() {
    const { mealId } = useParams();
    const navigate = useNavigate();

    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMeal() {
            const meals = await getMeals();
            const found = meals.find(m => m.mealId === mealId);
            setMeal(found || null);
            setLoading(false);
        }
        loadMeal();
    }, [mealId]);

    if (loading) {
        return <p className='mealview-loading'>Loading meal...</p>;
    }

    if (!meal) {
        return (
            <div className='mealview-container'>
                <h2>Meal not found</h2>
                <button className='btn-back' onClick={() => navigate("/meals")}>
                    BACK
                </button>
            </div>
        );
    }

    return (
        <div className='mealview-container'>
            <h1 className='mealview-title'>{meal.name}</h1>

            <div className='top-buttons'>
                <button className='btn-back' onClick={() => navigate("/meals")}>
                    BACK
                </button>

                <button className='btn-logout' onClick={() => navigate("/")}>
                    LOGOUT
                </button>
            </div>
            <img
                src={meal.imageUrl}
                alt={meal.name}
                className='mealview-image'
            />
            <div className='mealview-ingredients'>
                <h2 className='mealview-subtitle'>Ingredients</h2>
                <ul className = "ingredients-list">
                    {meal.ingredients.map((ing, index)=> (
                        <li key={index}>{ing}</li>
                    ))}
                </ul>
            </div>
            <button
                className='btn-search'
                onClick={async () =>{
                    await deleteMeal(mealId);
                    navigate("/meals")
                }}
            >
                DELETE MEAL
            </button>
        </div>
    );
}