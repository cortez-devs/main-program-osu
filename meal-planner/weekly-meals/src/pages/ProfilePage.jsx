import { useEffect, useState } from "react";
import { getUserProfile } from "../services/api/userProfileService";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

export default function ProfilePage() {
    const navigate = useNavigate();

    // ✅ Declare state variables
    const [profile, setProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const stored = localStorage.getItem("user");
        const user = stored ? JSON.parse(stored) : null;

        if (!user) {
            navigate("/login");
            return;
        }

        async function loadProfile() {
            try {
                const data = await getUserProfile(user.userId);
                if (data.error) {
                    setError(data.error);
                } else {
                    setProfile(data);
                }
            } catch {
                setError("Failed to load profile.");
            } finally {
                setLoadingProfile(false);
            }
        }

        loadProfile();
    }, [navigate]);

    if (loadingProfile) return <p>Loading profile...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="profile-container">
            <h1 className="profile-title">Your Profile</h1>
            {profile ? (
                <div className="profile-details">
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>User ID:</strong> {profile.userId}</p>
                </div>
            ) : (
                <p>No profile found.</p>
            )}
        </div>
    );
}
