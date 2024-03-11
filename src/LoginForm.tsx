import { useNavigate } from 'react-router-dom';
import "./LoginRegister.css";

export default function LoginForm() {
    const navigate = useNavigate();

    function handleSubmit(event: React.MouseEvent) {
        event.preventDefault();  // Prevents the form from being submitted
        event.stopPropagation(); // Prevents the form from being submitted
        alert("Successfully logged in!");
        navigate("/");
    }

    return (
        <div className="registerForm loginForm">
            <form>
                <h2>Login</h2>
                <input type="text" id="username" name="username" placeholder="Username" />
                <input type="password" name="password" placeholder='Password' />
                <button onClick={handleSubmit}>Login</button>
            </form>
        </div>
    );
}
