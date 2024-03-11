import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/404";
import HomePage from "./pages/HomePage";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import ProductPage from "./pages/ProductPage";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export default function App() {
    console.debug(`Running in ${import.meta.env.MODE} mode`);
    return (
        <BrowserRouter basename={BASE_URL}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:productId" element={<ProductPage />} />
                <Route path="/register" element={<LoginRegisterPage />} />
                <Route path="/login" element={<LoginRegisterPage />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}
