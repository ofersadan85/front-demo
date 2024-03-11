import { ProductID } from "./ProductCard";
import { useLocalStorage } from 'usehooks-ts'

export type Wishlist = ProductID[];

export default function WishListButton({ productId }: { productId: ProductID }) {
    const [wishlist, setWishlist] = useLocalStorage<Wishlist>("wishlist", []);
    const sign = wishlist.includes(productId) ? "-" : "+";
    function toggleWishlistItem() {
        setWishlist(wishlist => {
            if (wishlist.includes(productId)) {
                return wishlist.filter(id => id !== productId);
            } else {
                return [...wishlist, productId];
            }
        });
    }

    return <button className={"wishlistButton"} onClick={toggleWishlistItem}>{sign} Wishlist</button>;
}
