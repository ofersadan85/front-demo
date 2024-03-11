import { Link } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import CartButton, { Cart } from "./CartButton";
import "./ProductCard.css";
import WishListButton, { Wishlist } from "./WishListButton";

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

export default function ProductCard(product: Product) {
    const { id, thumbnail, title, amount, price, store, storeIcon } = product;
    const [cart] = useLocalStorage<Cart>("cart", {});
    const [wishlist] = useLocalStorage<Wishlist>("wishlist", []);
    const productInCart = cart[id] || 0;
    const isInWishlist = wishlist.includes(id);
    return (
        <div className="productCard">
            <Link to={`/product/${id}`} state={product}>
                <img src={thumbnail} alt="Product Thumbnail" className="productThumbnail" />
                {productInCart > 0 && <div className="cartCountRibbon">{productInCart} In Cart</div>}
                {isInWishlist && <div className="wishListRibbon">In Wishlist</div>}
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
                    <WishListButton productId={id} />
                    <CartButton productId={id} />
                </div>
            </div>
        </div>
    );
}
