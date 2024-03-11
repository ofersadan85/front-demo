import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import NavBar from "../NavBar";
import { Product } from "../ProductCard";
import WishListButton, { Wishlist } from "../WishListButton";
import "./ProductPage.css";
import CartButton, { Cart } from "../CartButton";
import { useLocalStorage } from "usehooks-ts";

export default function ProductPage() {
    const [product, setProduct] = useState<Product | null>(null);
    const { productId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [cart] = useLocalStorage<Cart>("cart", {});
    const [wishlist] = useLocalStorage<Wishlist>("wishlist", []);
    const productInCart = cart[Number(productId)] || 0;
    const isInWishlist = wishlist.includes(Number(productId));

    useEffect(() => {
        if (location.state) {
            setProduct(location.state as Product);
            return;
        }
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(response => response.json())
            .then(data => {
                data.thumbnail = data.image;
                setProduct(data);
            }).catch(() => navigate("/404"));
    }, [productId]);

    if (!productId) { navigate("/404"); return null; }

    return (
        <>
            <NavBar />
            <div className="productPage">
                <h1>{product?.title}</h1>
                <div className="productImage">
                    <img src={product?.thumbnail} alt={product?.title} />
                </div>
                <div className="productHeader">
                    {productInCart > 0 && <div className="cartCountRibbon">{productInCart} In Cart</div>}
                    {isInWishlist && <div className="wishListRibbon">In Wishlist</div>}
                    <p>Price: ${product?.price} | Amount: {product?.amount} | Category: {product?.category}</p>
                    <div className="productActions">
                        <WishListButton productId={Number(productId)} />
                        <CartButton productId={Number(productId)} />
                    </div>
                </div>
                <p>Description: {product?.description}</p>
                <Link to="/">Go Back</Link>
            </div>
        </>
    );
}
