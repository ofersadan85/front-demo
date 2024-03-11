import { useState, useRef } from 'react';
import "./LoginRegister.css";

export default function RegisterForm() {
    const [userError, setUserError] = useState("");
    const [passError, setPassError] = useState("");
    const [emailError, setEmailError] = useState("");
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    function validatePassword() {
        const pass1 = passwordRef.current?.value;
        const pass2 = confirmPasswordRef.current?.value;
        const err = (pass1?.length || 0) < 8 ? "Password must be at least 8 characters" : pass1 !== pass2 ? "Passwords do not match" : "";
        setPassError(err);
        return !err;
    }

    function validateUsername() {
        const exampleUsernames = ["admin", "john"];
        const username = usernameRef.current?.value;
        let err = "";
        if ((username?.length || 0) < 3) {
            err = "Username must be at least 3 characters";
        } else if (username && exampleUsernames.includes(username)) {
            err = "Username already taken";
        }
        setUserError(err);
        return !userError;
    }

    function validateEmail() {
        const email = emailRef.current?.value;
        const err = !email || !email.includes("@") ? "Invalid email" : "";
        setEmailError(err);
        return !err;
    }


    function handleSubmit(event: React.MouseEvent) {
        event.preventDefault();  // Prevents the form from being submitted
        event.stopPropagation(); // Prevents the form from being submitted
        if (validateUsername() && validatePassword() && validateEmail()) {
            alert("Successfully registered!");
        } else {
            alert("Please fix the errors in the form");
        }
    }

    const submitEnabled = !userError && !passError && !emailError;

    return (
        <div className="registerForm">
            <form>
                <h2>Register Now</h2>
                <input type="text" id="username" name="username" placeholder="Username" ref={usernameRef} onBlur={validateUsername} />
                {!userError ? null : <div className='registerFormError'>{userError}</div>}
                <input type="password" name="password" placeholder='Password' ref={passwordRef} onChange={validatePassword} />
                <input type="password" name="confirmPassword" placeholder='Confirm Password' ref={confirmPasswordRef} onChange={validatePassword} />
                {!passError ? null : <div className='registerFormError'>{passError}</div>}
                <input type="email" name="email" placeholder='Email' ref={emailRef} onChange={validateEmail} />
                {!emailError ? null : <div className='registerFormError'>{emailError}</div>}
                <button type="submit" onClick={handleSubmit} disabled={!submitEnabled}>Register</button>
            </form>
        </div>
    );
}
