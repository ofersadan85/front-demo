import { Link } from "react-router-dom";
import "./ProductCard.css";
import WishListButton from "./Wishlist";
import importantProducts from "./products.json";
import { useEffect, useState } from "react";

export type ProductID = number;
export type Product = {
    id: ProductID,
    thumbnail: string,
    title: string,
    description: string,
    amount: number,
    price: number,
    category: string,
    store: string,
    storeIcon: string
}

function addCart(id: ProductID) {
    let cart = JSON.parse(localStorage.getItem("cart") || "{}");
    cart[id] = (cart[id] || 0) + 1;
    localStorage.setItem("cart", JSON.stringify(cart));
}

function ProductCard(product: Product) {
    const { id, thumbnail, title, amount, price, store, storeIcon } = product;
    return (
        <div className="productCard">
            <Link to={`/product/${id}`} state={product}>
                <img src={thumbnail} alt="Product Thumbnail" className="productThumbnail" />
            </Link>
            <div className="productInfo">
                <div className="productHeader">
                    <img src={storeIcon} alt="Channel Icon" className="storeIcon" />
                    <div className="productText">
                        <h4 className="productTitle">{title}</h4>
                        <p className="storeName">{store}</p>
                    </div>
                </div>
                <div className="productStats">
                    <span className="views">{amount} remaining</span> • <span className="timestamp">{price}$</span>
                </div>
                <div className="productActions">
                    <WishListButton id={id} />
                    <button className="addCartButton" onClick={() => addCart(id)}>+ Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default function ProductCardContainer() {
    const [products, setProducts] = useState<Product[]>(importantProducts as Product[]);
    const cards = products.map(product => <ProductCard key={product.id} {...product} />);
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(response => response.json())
            .then(data => {
                data.map((item: any) => {
                    item.thumbnail = item.image;
                    item.store = item.category;
                    item.storeIcon = item.image;
                    item.amount = item.rating.count;
                    return item;
                });
                setProducts(data);
            });
    }, []);
    return <div className="productCardContainer">{cards}</div>;
}
