import LoginForm from "../LoginForm";
import "../LoginRegister.css";
import NavBar from "../NavBar";
import RegisterForm from "../RegisterForm";

export default function LoginRegisterPage() {
    return (
        <>
            <NavBar />
            <RegisterForm />
            <h3>OR</h3>
            <LoginForm />
        </>
    );
}