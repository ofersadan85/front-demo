import { useEffect, useState } from "react"
import "./App.css"
import VideoCardContainer from "./VideoCard";
import RegisterForm from "./RegisterForm";

export default function App() {
    const [count, setCount] = useState(0)
    const [refresh, setRefresh] = useState(true);
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(() => {
        console.log("Adding event listener");
        const eventID = window.addEventListener("resize", () => {
            setWindowSize(window.innerWidth * count)
        });
        return () => {
            console.log("Removing the previous listener");
            window.removeEventListener("resize", eventID);
        }
    }, [count]);

    return (
        <>
            <h3>Window size is: {windowSize}</h3>
            <div className="card">
                <button onClick={() => setCount((previous) => previous + 1)}>
                    count is {count}
                </button>
                <button onClick={() => setRefresh(previous => !previous)}>Refresh products &#8634;</button>
                <VideoCardContainer changeGlobalCount={setCount} refresh={refresh} />
                <RegisterForm />
            </div>
        </>
    )
}
