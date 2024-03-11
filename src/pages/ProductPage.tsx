import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import NavBar from "../NavBar";
import { Product } from "../ProductCard";
import WishListButton from "../Wishlist";
import "./ProductPage.css";

export default function ProductPage() {
    const [product, setProduct] = useState<Product | null>(null);
    const { productId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

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
            }).catch(() => navigate("/404", { replace: true }));
    }, [productId]);

    return (
        <>
            <NavBar />
            <div className="productPage">
                <h1>{product?.title}</h1>
                <div className="productImage">
                    <img src={product?.thumbnail} alt={product?.title} />
                </div>
                <div className="productHeader">
                    <p>Price: ${product?.price} | Amount: {product?.amount} | Category: {product?.category}</p>
                    <div className="productActions">
                        <WishListButton id={Number(productId)} />
                        <button className="addCartButton">+ Add to Cart</button>
                    </div>
                </div>
                <p>Description: {product?.description}</p>
                <Link to="/">Go Back</Link>
            </div>
        </>
    );
}
