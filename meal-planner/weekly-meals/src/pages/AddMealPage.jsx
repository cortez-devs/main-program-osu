import { useState} from "react";
import { useNavigate } from "react-router-dom";
import "./AddMealPage.css";

export default function AddMealPage() {
    const navigate = useNavigate();

    const [mealName, setMealName] = useState("");
    const [saved, setSaved] = useState(false);

    function handleLogout(){
        navigate("/");
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSaved(true);
        setMealName("");
    }

    return ( 
        <div className="meal-container">
            <h1>ADD MEAL</h1>

            <div className="top-buttons">
                <button className="btn-back" onClick={() => navigate("/meals")}>
                    BACK
                </button>

                <button className="btn-logout" onClick={handleLogout}>
                    LOGOUT
                </button>
            </div>

            <div className="input-box">
                <form onSubmit={handleSubmit} className="meal-form">
                    <label>Meal Name:</label>
                    <input
                        type="text"
                        placeholder="e.g. Spaghetti Bolognese"
                        value={mealName}
                        onChange={(e) => setMealName(e.target.value)}
                        required
                    />

                    <button className="btn-save">SAVE MEAL</button>
                </form>
            </div>
            \
            {saved && (
                <p className="saved-message">
                    ✔ Meal Saved Successfully!
                </p>
            )}
        </div>
    );
}