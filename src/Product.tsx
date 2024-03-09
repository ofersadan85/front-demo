import { useEffect, useState } from "react";
import "./Product.css";

export type Product = {
    thumbnail: string,
    title: string,
    views: number,
    timestamp: string,
    store: string,
    storeIcon: string
}

type ProductCardProps = Product & {
    changeGlobalCount: React.Dispatch<React.SetStateAction<number>>
}

function ProductCard({ thumbnail, title, views, timestamp, store, storeIcon, changeGlobalCount }: ProductCardProps) {
    let [updatedViews, setViews] = useState(views);

    return (
        <div className="productCard">
            <img src={thumbnail} alt="Product Thumbnail" className="productThumbnail" onClick={
                () => {
                    setViews(previous => previous + 1);
                    changeGlobalCount(previous => previous + 1);
                }
            } />
            <div className="productInfo">
                <div className="productHeader">
                    <img src={storeIcon} alt="Channel Icon" className="storeIcon" />
                    <div className="productText">
                        <h4 className="productTitle">{title}</h4>
                        <p className="channelName">{store}</p>
                    </div>
                </div>
                <div className="productStats">
                    <span className="views">{updatedViews} views</span> • <span className="timestamp">{timestamp}</span>
                </div>
            </div>
        </div>
    );
}

const importantProducts = [
    {
        thumbnail: "https://placehold.co/320x180/darkorange/white?text=Hello+World",
        title: "First store Title",
        store: "First store Name",
        views: 14,
        timestamp: "2 hours ago",
        storeImage: "https://placehold.co/100x100/white/black?text=HW",
    },
    {
        thumbnail: "https://placehold.co/320x180/darkcyan/white?text=store+No.2",
        title: "Second store Title",
        store: "Second store Name",
        views: 27,
        timestamp: "3 years ago",
        storeIcon: "https://placehold.co/100x100/darkgreen/black?text=V2",
    },
    {
        thumbnail: "https://placehold.co/320x180/white/black?text=3rd+store+Thumbnail",
        title: "Third store Title",
        store: "Third store Name",
        views: 32,
        timestamp: "4 months ago",
        storeIcon: "https://placehold.co/100x100/darkblue/white?text=Hi!",
    },
];

async function getProducts(): Promise<Product[]> {
    console.log("Getting data from the WEB");
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    for (let item of data) {
        item.thumbnail = item.image;
        item.store = item.category;
        item.views = item.id;
        item.timestamp = "2 Days ago";
        item.storeIcon = item.image;
    }
    return data;
}

type ProductContainerProps = {
    changeGlobalCount: React.Dispatch<React.SetStateAction<number>>
    refresh: boolean
}

export default function ProductCardContainer({ changeGlobalCount, refresh }: ProductContainerProps) {
    const [videos, setVideos] = useState(importantProducts);
    useEffect(() => {
        getProducts().then((products) => {
            const start = Math.floor(Math.random() * 10);
            const end = start + 3;
            const threeProducts = products.slice(start, end)
            setVideos(threeProducts);
        });
    }, [refresh]);

    return (
        <div className="productCardContainer">
            {videos.map((product, index) => (
                <ProductCard
                    key={index}
                    thumbnail={product.thumbnail}
                    title={product.title}
                    store={product.store}
                    views={product.views}
                    timestamp={product.timestamp}
                    storeIcon={product.thumbnail}
                    changeGlobalCount={changeGlobalCount}
                />
            ))}
        </div>
    );
}
