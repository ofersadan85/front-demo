import { useState } from "react"
import "./App.css"
import VideoCardContainer from "./VideoCard";
import RegisterForm from "./RegisterForm";

function getVideos() {
  return [
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
  ];
}

function App() {
  const [count, setCount] = useState(0)
  const sampleVideos = getVideos()
  return (
    <>
      <div className="card">
        <button onClick={() => setCount((previous) => previous + 1)}>
          count is {count}
        </button>
        <VideoCardContainer videos={sampleVideos} />
        <RegisterForm />
      </div>
    </>
  )
}

export default App
