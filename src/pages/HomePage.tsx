
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { Cart } from "../CartButton";
import NavBar from "../NavBar";
import ProductCard, { Product } from "../ProductCard";
import { Wishlist } from "../WishListButton";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

export default function HomePage() {
    const [cart] = useLocalStorage<Cart>("cart", {});
    const [wishlist] = useLocalStorage<Wishlist>("wishlist", []);
    const [urlParams, _setUrlParams] = useSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    const cards = products.map(product => <ProductCard key={product.id} {...product} />);
    const filter = urlParams.get("filter");

    const cachedProducts = useMemo(async () => {
        const URL = `${BACKEND_URL}/products`;
        console.debug(`Fetching all products from ${URL}`);
        const response = await fetch(URL);
        const data = await response.json();
        return data.map((item: any) => {
            item.thumbnail = item.image;
            item.store = item.category;
            item.storeIcon = item.image;
            item.amount = item.rating.count;
            return item;
        });
    }, []);


    useEffect(() => {
        console.debug(`Setting products for filter: ${filter}`);
        switch (filter) {
            case "wishlist":
                cachedProducts.then(data => {
                    setProducts(data.filter((product: Product) => wishlist.includes(product.id)))
                });
                break;
            case "cart":
                cachedProducts.then(data => {
                    setProducts(data.filter((product: Product) => cart[product.id]));
                });
                break;
            default:
                cachedProducts.then(data => setProducts(data));
        }
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
