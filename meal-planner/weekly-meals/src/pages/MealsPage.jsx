import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMeals } from "../services/api/mealService"
import './MealsPage.css';

export default function MealsPage() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        async function loadMeals() {
            try {
                const data =await getMeals();
                setMeals(data);
            } catch (err) {
                console.error("Failed to load Meals", err);
            }
            setLoading(false);
        }

        loadMeals();
    }, []);

    const filteredMeals = meals.filter((meal) =>
        meal.name.toLowerCase().includes(search.toLowerCase())
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
                {loading && <p>Loading meals...</p>}

                {!loading && filteredMeals.length === 0 && (
                    <p className='empty-message'>No meals found</p>
                )}

                {!loading &&
                    filteredMeals.map((meal) => (
                        <div 
                        key={meal.mealId} 
                        className="meal-card"
                        onClick={() => navigate(`/meal/${meal.mealId}`)}
                        >
                            {meal.name}
                        </div>
                    ))}

            </div>

            <button className="btn-add" onClick={() => navigate("/add-meal")}>
            ADD MEAL
            </button>
        </div>
    );
}
