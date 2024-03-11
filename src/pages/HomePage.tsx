import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { Cart } from "../CartButton";
import NavBar from "../NavBar";
import ProductCard, { Product } from "../ProductCard";
import { Wishlist } from "../WishListButton";

export default function HomePage() {
    const [cart] = useLocalStorage<Cart>("cart", {});
    const [wishlist] = useLocalStorage<Wishlist>("wishlist", []);
    const [urlParams, setUrlParams] = useSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    const cards = products.map(product => <ProductCard key={product.id} {...product} />);
    const filter = urlParams.get("filter");
    useEffect(() => {
        console.log("Fetching products");
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
                if (filter === "cart") { data = data.filter((product: Product) => cart[product.id]); }
                else if (filter === "wishlist") { data = data.filter((product: Product) => wishlist.includes(product.id)); }
                setProducts(data);
            });
    }, [urlParams]);

    const wishlistHeader = <>
        <h1>Wishlist</h1>
        {products.length === 0 && <h3>Add items to your wishlist to see them here</h3>}
    </>;
    const cartHeader = <>
        <h1>Your Cart</h1>
        {products.length === 0 && <h3>Add items to your shopping cart to see them here</h3>}
    </>;

    return (
        <>
            <NavBar />
            {filter === "wishlist" && wishlistHeader}
            {filter === "cart" && cartHeader}
            <div className="productCardContainer">
                {cards}
            </div>
            {filter && <Link to="/"><button onClick={() => window.scrollTo(0, 0)}>Clear Filter - See all products</button></Link>}
        </>
    );
}
