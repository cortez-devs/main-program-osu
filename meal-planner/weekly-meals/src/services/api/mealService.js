const PERSIST_API = "http://127.0.0.1:5000/persist/meals.json";

export async function getMeals() {
    const res = await fetch(PERSIST_API);

    if (res.status === 404) {
        return []; 
    }
    if (!res.ok) throw new Error("Failed to load meals");

    return await res.json();
}

export async function createMeal(meal) {
    const meals = await getMeals();
    meals.push(meal);

    const res = await fetch(PERSIST_API, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meals)
    });

    if (!res.ok) throw new Error("Failed to save meal");

    return meal;
}

export async function updateMeal(mealId, updates) {
    const meals = await getMeals();

    const updatedMeals = meals.map(m =>
        m.mealId === mealId ? { ...m, ...updates } : m
    );

    const res = await fetch(PERSIST_API, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMeals)
    });

    if (!res.ok) throw new Error("Failed to update meal");

    return updates;
}

export async function deleteMeal(mealId) {
    const meals = await getMeals();

    const updatedMeals = meals.filter(m => m.mealId !== mealId);

    const res = await fetch(PERSIST_API, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMeals)
    });

    if (!res.ok) throw new Error("Failed to delete meal");

    return true;
}
