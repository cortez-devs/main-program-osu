import { Link } from "react-router-dom";
import "./LandingPage.css";
export default function LandingPage() {
    return (
        <div className="landing-container">
            <header className="hero">
                <h1>Family Meal Planner</h1>
                <p>Welcome! Please login or create a new account</p>

                <div className="buttons">
                    <Link to="/login" className="btn login">Login</Link>
                    <Link to="/register" className="btn register">Register</Link>
                </div>
            
            <p className="tagline">Save time and money by planning ahead!</p>
            </header>
        </div>
    );
}