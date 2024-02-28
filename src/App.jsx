import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import VideoCardContainer from "./VideoCardContainer";


const sampleVideos = [
  {
    thumbnail: "https://placehold.co/320x180/darkorange/white?text=Hello+World",
    title: "First Video Title",
    channel: "First Channel Name",
    views: "14",
    timestamp: "2 hours ago",
    channelImage: "https://placehold.co/100x100/white/black?text=HW",
  },
  {
    thumbnail: "https://placehold.co/320x180/darkcyan/white?text=Video+No.2",
    title: "Second Video Title",
    channel: "Second Channel Name",
    views: "27",
    timestamp: "3 years ago",
    channelImage: "https://placehold.co/100x100/darkgreen/black?text=V2",
  },
  {
    thumbnail: "https://placehold.co/320x180/white/black?text=3rd+Video+Thumbnail",
    title: "Third Video Title",
    channel: "Third Channel Name",
    views: "32",
    timestamp: "4 months ago",
    channelImage: "https://placehold.co/100x100/darkblue/white?text=Hi!",
  },
  // Add more video objects as needed
];


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 2)}>
          count is {count}
        </button>
        <VideoCardContainer videos={sampleVideos} />
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
