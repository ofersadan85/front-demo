import { useState } from "react"
import "./App.css"
import ProductCardContainer from "./Product";
import RegisterForm from "./RegisterForm";


export default function App() {
    const [count, setCount] = useState(0)
    const [refresh, setRefresh] = useState(true);

    return (
        <>
            <div className="card">
                <button onClick={() => setCount((previous) => previous + 1)}>
                    count is {count}
                </button>
                <button onClick={() => setRefresh(previous => !previous)}>Refresh products &#8634;</button>
                <ProductCardContainer changeGlobalCount={setCount} refresh={refresh} />
                <RegisterForm />
            </div>
        </>
    )
}
