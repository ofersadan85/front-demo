import React from "react";
import { useState } from "react";
import "./VideoCard.css"; // Make sure the CSS file is in the same directory

function VideoCard({ thumbnail, title, channel, views, timestamp, channelImage }) {
    let [updatedViews, setViews] = useState(views);

    return (
        <div className="videoCard">
            <img src={thumbnail} alt="Video Thumbnail" className="videoThumbnail" onClick={
                () => setViews((previous) => Number(previous) + 1)
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
};


export default function VideoCardContainer({ videos }) {
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
