import { useState } from 'react';
/*import { registerUser } from "../services/AuthService";*/
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

        setRegistered(true);

        setTimeout(() => {
            navigate("/dashboard");
        }, 2500);
        //setError("");

       /* try {
            const res = await registerUser(name, email, password);
            if (res.error) {
                setError(res.error);
                return;
            }

            navigate("/login");

        } catch (err) {
            setError("Registration failed. Please try again.");
        }*/
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

                {registered && (
                    <p className="success-message">✔ You have been registered!</p>
                )}

                <button className="btn-register">
                    Register
                </button>
            </form>

            <p className='register-link'>
                Already have an account? <a href="/login">Login here</a>
            </p>
        </div>

    );
}