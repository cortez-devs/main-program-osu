import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
    const navigate = useNavigate();

    function handleLogout() {
        navigate("/");
    }

    const today = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
    return (
        <div className="dash-container">
            <div className="dash-header">
                <div className="dash-title">
                    <span className="dash-logo">🍽️</span>
                    <h1>Family Meal Planner</h1>
                </div>

                <button className="btn-logout" onClick={handleLogout}>LOGOUT</button>
            </div>

            <p className="dash-welcome">Welcome back!</p>
            <p className="dash-date">{today}</p>

            <div className="dash-buttons">
                <Link to="/meals" className="btn-view">
                MEAL LIST
                </Link>

                <Link to="/add-meal" className="btn-add">
                ADD MEAL
                </Link>
            </div>
            <div className="dash-tip">
                Tip: Add your first meal. Lets start planning your week!
            </div>
        </div>
    );
}