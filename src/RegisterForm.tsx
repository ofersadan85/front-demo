import { useState, useRef } from 'react';
import './RegisterForm.css';

const exampleUsernames = ["admin", "john"];

export default function RegisterForm() {
    const [userError, setUserError] = useState("");
    const [passError, setPassError] = useState("");
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    function checkPasswordMatch() {
        if (passwordRef.current && confirmPasswordRef.current && passwordRef.current.value !== confirmPasswordRef.current.value) {
            setPassError("Passwords do not match");
            return false;
        } else {
            setPassError("");
            return true;
        }
    }

    function checkUsername() {
        if (usernameRef.current && exampleUsernames.includes(usernameRef.current.value)) {
            setUserError("Username already taken");
            return false;
        } else {
            setUserError("");
            return true;
        }
    }

    function handleSubmit(event: React.MouseEvent) {
        event.preventDefault();  // Prevents the form from being submitted
        event.stopPropagation(); // Prevents the form from being submitted
        if (checkUsername() && checkPasswordMatch()) {
            alert("Successfully registered!");
        } else {
            alert("Please fix the errors in the form");
        }
    }

    const submitEnabled = !userError && !passError;

    return (
        <div className="registerForm">
            <form>
                <h2>Register Form</h2>
                <input type="text" id="username" name="username" placeholder="Username" ref={usernameRef} onBlur={checkUsername} />
                {!userError ? null : <div className='registerFormError'>{userError}</div>}
                <input type="password" id="password" name="password" placeholder='Password' ref={passwordRef} onChange={checkPasswordMatch} />
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder='Confirm Password' ref={confirmPasswordRef} onChange={checkPasswordMatch} />
                {!passError ? null : <div className='registerFormError'>{passError}</div>}
                <button onClick={handleSubmit} disabled={!submitEnabled}>Register</button>
            </form>
        </div>
    );
}