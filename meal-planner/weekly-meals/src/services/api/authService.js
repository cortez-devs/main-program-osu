const API = "http://localhost:3001";

export async function loginUser(email, password) {
    const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    return res.json();
}

export async function registerUser(email, password) {
    const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, password })
    });

    return res.json();
}