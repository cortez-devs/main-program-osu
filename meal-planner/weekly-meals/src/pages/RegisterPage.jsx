import { useState } from 'react';
import { registerUser } from "../services/api/authService";
import { createUserProfile } from '../services/api/userProfileService';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

export default function RegisterPage() {
    const navigate = useNavigate();
    
    const [registered, setRegistered] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            // ✅ Register user (auth microservice expects ONLY email + password)
            const authRes = await registerUser(email, password);

            if (authRes.error) {
                setError(authRes.error);
                return;
            }

            // ✅ Extract returned values
            const userId = authRes.userId;
            const authEmail = authRes.email;

            // ❗ If these are undefined, profile creation will fail
            if (!userId || !authEmail) {
                setError("Registration failed: missing userId or email from auth service.");
                return;
            }

            const profileRes = await createUserProfile(userId, name, authEmail);

            if (profileRes.error) {
                setError(profileRes.error);
                return;
            }

            localStorage.setItem("user", JSON.stringify({ userId, email: authEmail }));

            setRegistered(true);

            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);

        } catch (err) {
            setError("Registration failed. Please try again.");
        }
    }

    return (
        <div className="register-container">
            <h1 className="register-title">Create Account</h1>

            <form className="register-form" onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label>Email:</label>
                <input
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Password:</label>
                <input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <p className="error-message">{error}</p>}
                {registered && (
                    <p className="success-message">✔ You have been registered!</p>
                )}

                <button className="btn-register">Register</button>
            </form>

            <p className='login-link'>
                Already have an account? <a href="/login">Login here</a>
            </p>
        </div>
    );
}
