import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/404";
import LoginRegisterPage from "./pages/LoginRegisterPage";

export default function App() {
    return (
        <BrowserRouter>
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
