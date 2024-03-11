import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PageNotFound() {
    const navigate = useNavigate();
    useEffect(() => {
        const timeoutId = setTimeout(() => navigate("/"), 3000); // Redirect to home page after 3 seconds
        return () => clearTimeout(timeoutId); // Cleanup the timeout on component unmount
    }, []);
    return (
        <>
            <h1>Not Found - 404</h1>
            <p>Sorry, the page you are looking for is not found</p>
            <Link to="/">Go Home</Link>
        </>
    );
}
