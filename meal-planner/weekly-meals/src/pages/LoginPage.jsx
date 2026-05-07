import {useState} from 'react';
import {loginUser} from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        setLoggedIn(true);
        setTimeout(() => {
            navigate("/dashboard");
        }, 1500);
        // setError("");

        // try {
        //     const res = await loginUser(email, password);

        //     if (res.error){
        //         setError(res.error);
        //         return;
        //     }

        //     localStorage.setItem("token", res.token);

        //     navigate("/planner");
        // } catch (err) {
        //     setError("Login failed. Please try again.");
        // }
    }

    return (
        <div className="login-container">
            <h1 className="login-title">Login</h1>

            <form onSubmit={handleSubmit} className="login-form">
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

                {loggedIn && (
                    <p className="success-message">✔ You have been logged in!</p>
                )}

                <button className="btn-login">Login</button>
            </form>

            <p className='register-link'>
                Don't have an account? <a href="/register">Register here</a>
            </p>
        </div>
    );
}