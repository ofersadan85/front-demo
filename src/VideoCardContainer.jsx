import React from "react";
import VideoCard from "./VideoCard"; // Import the VideoCard component
import "./VideoCardContainer.css"; // CSS for styling the container

function VideoCardContainer({ videos }) {
    return (
        <div className="videoCardContainer">
            {videos.map((video, index) => (
                <VideoCard
                    key={index}
                    thumbnail={video.thumbnail}
                    title={video.title}
                    channel={video.channel}
                    views={video.views}
                    timestamp={video.timestamp}
                    channelImage={video.channelImage}
                />
            ))}
        </div>
    );
};

export default VideoCardContainer;
