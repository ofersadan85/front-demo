import { Link } from "react-router-dom";
import "./ProductCard.css";
import WishListButton from "./Wishlist";

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

export default function ProductCard(product: Product) {
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
