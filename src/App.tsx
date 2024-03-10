import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import ProductCardContainer from "./ProductCard";
import ProductPage from "./ProductPage";
import RegisterForm from "./RegisterForm";

function PageNotFound() {
    return <>
        <h1>Not Found - 404</h1>
        <p>Sorry, the page you are looking for is not found</p>
        <Link to="/">Go Home</Link>
    </>
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProductCardContainer />} />
                <Route path="/product/:productId" element={<ProductPage />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}
