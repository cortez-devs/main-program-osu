import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../services/api/imageService";
import { createMeal } from "../services/api/mealService";
import "./AddMealPage.css";

export default function AddMealPage({ onMealCreated, userId }) {
    const navigate = useNavigate();

    const [mealName, setMealName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    function handleLogout() {
        navigate("/");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please upload an image");

        setLoading(true);
        setSaved(false);

        try {
            const { url } = await uploadImage(file);

            const meal = {
                mealId: crypto.randomUUID(),
                name: mealName,
                ingredients: ingredients.split(",").map(i => i.trim()),
                imageUrl: url,
                userId
            };

            const savedMeal = await createMeal(meal);
            if (onMealCreated) onMealCreated(savedMeal);

            setMealName("");
            setIngredients("");
            setFile(null);
            setSaved(true);

        } catch (err) {
            console.error("Failed to create meal", err);
        }

        setLoading(false);
    };

    return (
        <div className="addmeal-wrapper">
            <div className="addmeal-card">
                <h1 className="title">Add Meal</h1>

                <div className="top-buttons">
                    <button className="btn-back" onClick={() => navigate("/meals")}>
                        Back
                    </button>

                    <button className="btn-logout" onClick={handleLogout}>
                        Logout
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="form">
                    <label>Meal Name</label>
                    <input
                        type="text"
                        placeholder="Spaghetti"
                        value={mealName}
                        onChange={(e) => setMealName(e.target.value)}
                        required
                    />

                    <label>Ingredients</label>
                    <textarea
                        placeholder="Comma separated list"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        required
                    />

                    <label className="file-label">
                        Choose Image
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>{setFile(e.target.files[0]);}}
                            required
                        />
                    </label>

                    {file && <p className="file-name">Selected: {file.name}</p>}

                    <button type="submit" className="btn-save" disabled={loading}>
                        {loading ? "Saving..." : "Save Meal"}
                    </button>
                </form>

                {saved && <p className="success">✔ Meal saved successfully!</p>}
            </div>
        </div>
    );
}
