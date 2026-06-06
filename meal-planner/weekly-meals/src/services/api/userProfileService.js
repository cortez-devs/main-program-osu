const PROFILE_API = "http://localhost:3002";

export async function createUserProfile(userId, name, email) {
    try {
        const res = await fetch(`${PROFILE_API}/profiles`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, name, email })
        });

        return await res.json();
    } catch (err) {
        console.error("Error creating user profile:", err);
        return { error: "Failed to create profile" };
    }
}

export async function getUserProfile(userId) {
    try {
        const res = await fetch(`${PROFILE_API}/profiles/${userId}`);
        return await res.json();
    } catch (err) {
        console.error("Error fetching profile:", err);
        return { error: "Failed to load profile" };
    }
}

export async function updateUserProfile(userId, updates) {
    try {
        const res = await fetch(`${PROFILE_API}/profiles/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates)
        });

        return await res.json();
    } catch (err) {
        console.error("Error updating profile:", err);
        return { error: "Failed to update profile" };
    }
}

export async function deleteUserProfile(userId) {
    try {
        const res = await fetch(`${PROFILE_API}/profiles/${userId}`, {
            method: "DELETE"
        });

        return await res.json();
    } catch (err) {
        console.error("Error deleting profile:", err);
        return { error: "Failed to delete profile" };
    }
}