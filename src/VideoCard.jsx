import { useEffect, useState } from "react";
import "./VideoCard.css";


function VideoCard({ thumbnail, title, channel, views, timestamp, channelImage, changeGlobalCount }) {
    let [updatedViews, setViews] = useState(views);

    return (
        <div className="videoCard">
            <img src={thumbnail} alt="Video Thumbnail" className="videoThumbnail" onClick={
                () => {
                    setViews((previous) => Number(previous) + 1);
                    changeGlobalCount(previous => previous + 1);
                }
            } />
            <div className="videoInfo">
                <div className="videoHeader">
                    <img src={channelImage} alt="Channel Icon" className="channelImage" />
                    <div className="videoText">
                        <h4 className="videoTitle">{title}</h4>
                        <p className="channelName">{channel}</p>
                    </div>
                </div>
                <div className="videoStats">
                    <span className="views">{updatedViews} views</span> • <span className="timestamp">{timestamp}</span>
                </div>
            </div>
        </div>
    );
}

const importantProducts = [
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

async function getVideos() {
    console.log("Getting data from the WEB");
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    for (let item of data) {
        item.thumbnail = item.image;
        item.channel = item.category;
        item.views = item.id;
        item.timestamp = "2 Days ago";
        item.channelImage = item.image;
    }
    return data;
}

export default function VideoCardContainer({ changeGlobalCount, refresh }) {
    const [videos, setVideos] = useState(importantProducts);

    useEffect(() => {
        getVideos().then((videosFromWeb) => {
            const start = Math.floor(Math.random() * 10);
            const end = start + 3;
            const threeProducts = videosFromWeb.slice(start, end)
            setVideos(threeProducts);
        });
    }, [refresh]);

    console.log("This video container is rendered");

    return (
        <div className="videoCardContainer">
            {videos.map((video, index) => (
                <VideoCard
                    key={video.title}
                    thumbnail={video.thumbnail}
                    title={video.title}
                    channel={video.channel}
                    views={video.views}
                    timestamp={video.timestamp}
                    channelImage={video.channelImage}
                    changeGlobalCount={changeGlobalCount}
                />
            ))}
        </div>
    );
}
