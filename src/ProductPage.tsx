import { Link, useParams } from "react-router-dom";
import { Product } from "./ProductCard";
import { useEffect, useState } from "react";
import WishListButton from "./Wishlist";
import "./ProductPage.css";

export default function ProductPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(response => response.json())
            .then(data => {
                data.thumbnail = data.image;
                setProduct(data);
            });
    }, [productId]);

    return (
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
    );
}
