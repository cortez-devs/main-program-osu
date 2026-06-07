import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../services/api/userProfileService";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../services/api/imageService";
import "./ProfilePage.css";

export default function ProfilePage() {
    const navigate = useNavigate();

    // ✅ Declare state variables
    const [profile, setProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [error, setError] = useState("");

    const handleProfileImageUpload = async (e) => {
        if (!profile) return

        const file = e.target.files[0];
        if (!file) return;

        try {
            const { url } = await uploadImage(file);

            const updated = await updateUserProfile(profile.userId, {
                ...profile,
                avatarUrl: url
            });

            setProfile(updated.profile);
        } catch (err) {
            console.error("Failed to upload profile image", err);
        }
    };

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

            <div className="profile-avatar-container">
                <img
                    src={profile.avatarUrl || "/default-avatar.png"}
                    alt="Profile"
                    className="profile-avatar"
                />
                <label htmlFor="avatarUpload" className="upload-btn">
                    Upload Profile Picture
                </label>
                <input
                    id="avatarUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    className="hidden-file-input"
                />
            </div>
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
