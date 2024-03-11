import { ProductID } from "./ProductCard";
import { useLocalStorage } from 'usehooks-ts'

export type Cart = { [productId: number]: number };

export default function CartButton({ productId }: { productId: ProductID }) {
    const [_, setCart] = useLocalStorage<Cart>("cart", {});
    function addToCart() {
        setCart(cart => {
            return { ...cart, [productId]: (cart[productId] || 0) + 1 };
        });
    }
    return <button className={"addCartButton"} onClick={addToCart}>+ Add to Cart</button>;
}
