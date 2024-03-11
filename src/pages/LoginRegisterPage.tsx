import NavBar from "../NavBar";
import RegisterForm from "../RegisterForm";
import LoginForm from "../LoginForm";
import "../LoginRegister.css";

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