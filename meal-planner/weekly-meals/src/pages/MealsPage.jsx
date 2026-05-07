import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import './MealsPage.css';

export default function MealsPage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const meals = [
        "Spaghetti Bolognese",
        "Chicken Stir Fry",
        "Vegetable Curry",
    ];

    const filteredMeals = meals.filter((meal) =>
        meal.toLowerCase().includes(search.toLowerCase())
    );

    function handleLogout() {
        navigate("/");
    }

    return(
        <div className="meal-container">
            <h1 className="meal-title">Your Saved Meals</h1>

            <div className="top-button">
                <button className="btn-back" onClick={() => navigate("/dashboard")}>
                    BACK
                </button>

                <button className="btn-logout" onClick={handleLogout}>
                    LOGOUT
                </button>
            </div>

            <div className= "search-section">
                <input
                    type="text"
                    placeholder="Search meals..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn-search">SEARCH</button>
            </div>

            <h2 className="meal-subtitle">MEALS</h2>

            <div className="meal-list">
                {filteredMeals.map((meal, index) => (
                    <div key={index} className="meal-card">
                        {meal}
                    </div>
                ))}

            </div>

            <button className="btn-add" onClick={() => navigate("/add-meal")}>
            ADD MEAL
            </button>
        </div>
    );
}
