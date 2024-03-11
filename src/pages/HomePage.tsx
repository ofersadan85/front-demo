import { useEffect, useState } from "react";
import NavBar from "../NavBar";
import ProductCard, { Product } from "../ProductCard";

export default function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);
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
    return (
        <>
            <NavBar />
            <div className="productCardContainer">{cards}</div>;
        </>
    );
}
